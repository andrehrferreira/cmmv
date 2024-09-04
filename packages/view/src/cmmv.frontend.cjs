(function(global) {
    try {
        class Telemetry {
            constructor() {
                this.metrics = {};
            }

            start(label) {
                if (!this.metrics[label]) {
                    this.metrics[label] = { start: 0, end: 0, duration: 0 };
                }
                this.metrics[label].start = performance.now();
            }

            end(label) {
                if (this.metrics[label]) {
                    this.metrics[label].end = performance.now();
                    this.metrics[label].duration = this.metrics[label].end - this.metrics[label].start;
                }
            }

            log() {
                let totalDuration = 0;
                const summary = Object.keys(this.metrics).map(key => {
                    const duration = this.metrics[key].duration;
                    totalDuration += duration;
                    return {
                        Process: key,
                        Duration: `${duration.toFixed(2)} ms`,
                    };
                });
            
                summary.push({
                    Process: 'Total',
                    Duration: `${totalDuration.toFixed(2)} ms`
                });
            
                console.table(summary);
            }            
        }

        let cmmvMiddleware = {
            app: null,
            socket: null,
            contractIndex: {},
            contracts: {},
            context: {},
            contextApp: null,
            loaded: false,
            binds: {},
            telemetry: new Telemetry(),

            initialize(context, methods, mounted) {
                this.telemetry.start('Initialize');
                try {
                    if (context.config && context.config.rpc && context.config.rpc.enabled) {
                        this.telemetry.start('WebSocket Initialization');
                        this.socket = new WebSocket(
                            window.location.href.replace("https", "wss").replace("http", "ws")
                        );
                        this.socket.addEventListener("message", this.parseMessage.bind(this));
                        this.socket.binaryType = 'arraybuffer';
                        this.telemetry.end('WebSocket Initialization');
                    }
                } catch (e) {
                    console.error(e);
                }

                if (typeof context === 'object') {
                    this.context = Object.assign(this.context, context);
                }

                document.addEventListener('DOMContentLoaded', () => {
                    this.processExpressions();
                    this.telemetry.log();
                });

                this.telemetry.end('Initialize');
            },

            addContracts(jsonContracts) {
                this.telemetry.start('Load Contracts');
                try {
                    this.contractIndex = jsonContracts.index;
                    for (let contractName in jsonContracts.contracts) {
                        if (jsonContracts.contracts.hasOwnProperty(contractName)) {
                            let contract = protobuf.Root.fromJSON(jsonContracts.contracts[contractName]);
                            this.contracts[contractName] = contract;
                        }
                    }

                    this.generateRPCBindings();
                } catch (e) {
                    console.error("Error loading contracts:", e);
                }
                this.telemetry.end('Load Contracts');
            },

            getContract(contractName) {
                return this.contracts[contractName];
            },

            parseMessage(event) {
                this.telemetry.start('Parse Message');
                try {
                    const buffer = event.data instanceof ArrayBuffer ? new Uint8Array(event.data) : event.data;
                    const message = this.contracts["ws"].lookupType("WsCall").decode(buffer);

                    const contractName = Object.keys(this.contractIndex).find(name => this.contractIndex[name].index === message.contract);
                    const typeName = Object.keys(this.contractIndex[contractName].types).find(key => this.contractIndex[contractName].types[key] === message.message);

                    if (contractName && typeName) {
                        const contract = this.getContract(contractName);
                        const MessageType = contract.lookupType(typeName);
                        const decodedMessage = MessageType.decode(message.data);

                        if (this.binds[contractName] && this.binds[contractName][typeName]) {
                            this.binds[contractName][typeName].forEach(callback => callback.apply(this.contextApp, [decodedMessage, event.socket]));
                        }
                    } else {
                        console.error("Unknown contract or message type:", message.contract, message.message);
                    }
                } catch (error) {
                    console.error(error);
                }
                this.telemetry.end('Parse Message');
            },

            pack(contractName, messageName, data) {
                try{
                    if(this.contracts[contractName] && this.contractIndex[contractName]) {
                        const contractIndex = this.contractIndex[contractName];
                        const typeIndex = contractIndex?.types[messageName];
                        const contract = this.contracts[contractName];
                        const message = contract?.lookupType(messageName);
                        const dataBuffer = (message && data) ? message.encode(data).finish() : null;
                        const wsCall = this.contracts["ws"];
                        const wsMessage = wsCall?.lookupType("WsCall");
            
                        const buffer = wsMessage?.encode({
                            contract: contractIndex?.index,
                            message: typeIndex,
                            data: (dataBuffer && dataBuffer instanceof Uint8Array) ? dataBuffer : new Uint8Array()
                        }).finish();
            
                        return (buffer) ? new Uint8Array(buffer) : null;
                    } else {
                        console.error(`Not found in contract list ${contractName}.${messageName}`);
                        return null;
                    }
                }
                catch(e){
                    console.error(e);
                }
            },

            generateRPCBindings() {            
                Object.keys(cmmv.contracts).forEach((contractName) => {
                    const contract = cmmv.contracts[contractName];
            
                    if (contract.nested) {
                        Object.keys(contract.nested).forEach((nestedName) => {
                            const nestedItem = contract.nested[nestedName];
                            
                            if (nestedItem.nested) {
                                Object.keys(nestedItem.nested).forEach((methodName) => {
                                    if(methodName.indexOf("Request") > -1){
                                        cmmv[methodName] = (data) => {
                                            if(methodName.startsWith("Add"))
                                                this.rpc.add(contractName, methodName, data);
                                            else if(methodName.startsWith("Update"))
                                                this.rpc.update(contractName, methodName, data);
                                            else if(methodName.startsWith("Delete"))
                                                this.rpc.delete(contractName, methodName, { id: data });
                                        }   
                                    }
                                    else if(methodName.indexOf("Response")){
                                        if(this[methodName]  && typeof this[methodName] === "function")
                                            this.rpc.on(contractName, methodName, this[methodName]);                                        
                                    }
                                });
                            }
                        });
                    }
                });
            },

            send(buffer){
                this.socket.send(buffer);
            },

            processExpressions() {
                this.telemetry.start('Process Expressions');

                this.telemetry.start('CreateApp');
                this.contextApp = this.reactive({
                    $template: "#app",
                    loaded: true,
                    ...this,
                    rpc: this.rpc,
                    ...this.context,
                    mounted: this.mounted,
                    created: this.created
                });

                const app = this.createApp(this.contextApp);
                this.telemetry.end('CreateApp');

                if (typeof this.contextApp?.created === "function") {
                    this.telemetry.start('Created Hook');
                    this.contextApp?.created();
                    this.telemetry.end('Created Hook');
                }

                this.telemetry.start('Mount App');
                this.app = app.mount();
                this.telemetry.end('Mount App');

                if (typeof this.contextApp?.mounted === "function") {
                    this.telemetry.start('Mounted Hook');
                    this.contextApp?.mounted();
                    this.telemetry.end('Mounted Hook');
                }

                this.telemetry.end('Process Expressions');
            },

            rpc: {
                get: (contract, messageType) => {
                    let buffer = cmmv.pack.call(cmmv, contract, messageType);
                    cmmv.send(buffer);
                },
                add: (contract, messageType, data) => {
                    let buffer = cmmv.pack.call(cmmv, contract, messageType, { item: data });
                    cmmv.send(buffer);
                },
                update: (contract, messageType, data) => {
                    let buffer = cmmv.pack.call(cmmv, contract, messageType, { id: data.id, item: data });
                    cmmv.send(buffer);
                },
                delete: (contract, messageType, data) => {
                    let buffer = cmmv.pack.call(cmmv, contract, messageType, { id: data.id });
                    cmmv.send(buffer);
                },
                on: (contract, messageType, cb) => {
                    if (!cmmv.binds[contract]) cmmv.binds[contract] = {};
                    if (!cmmv.binds[contract][messageType]) cmmv.binds[contract][messageType] = [];
                    cmmv.binds[contract][messageType].push(cb);
                }
            }
        };

        if (global.cmmvSetup) {            
            let methods = {};
            if (typeof global.cmmvSetup.__methods === "object") {
                for (let key in global.cmmvSetup.__methods)
                    methods[key] = new Function(`return (${global.cmmvSetup.__methods[key]})`)()
            }

            let mounted = (global.cmmvSetup.__mounted) ? new Function(`return (${global.cmmvSetup.__mounted})`)() : null;

            global.cmmv = Object.assign({ ...methods, mounted }, cmmv, global.cmmvSetup, cmmvMiddleware);
            global.cmmv.initialize(global.cmmvSetup.__data || {});
        } else {
            global.cmmv = Object.assign({}, cmmvMiddleware);
            global.cmmv.initialize({});
        }
    } catch (e) {
        console.error(e);
    }
})(typeof window !== "undefined" ? window : global);
