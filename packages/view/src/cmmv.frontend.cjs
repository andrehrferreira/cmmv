(function(global) {
    let cmmvMiddleware = {
        app: null,

        socket: null,

        contractIndex: {},

        contracts: {},

        context: {}, 

        contextApp: null,

        initialize(context, methods, mounted) {
            this.socket = new WebSocket(
                window.location.href
                    .replace("https", "wss")
                    .replace("http", "ws")
            );

            this.socket.addEventListener("message", this.parseMessage.bind(this));
            this.socket.binaryType = 'arraybuffer';             

            if(typeof context == 'object')
                this.context = Object.assign(this.context, context);

            document.addEventListener('DOMContentLoaded', this.processExpressions.bind(this));
        },

        addContracts: function(jsonContracts) {
            try {
                this.contractIndex = jsonContracts.index;

                for (let contractName in jsonContracts.contracts) {
                    if (jsonContracts.contracts.hasOwnProperty(contractName)) {
                        let contract = protobuf.Root.fromJSON(jsonContracts.contracts[contractName]);
                        this.contracts[contractName] = contract;         
                    }             
                }
            } catch (e) {
                console.error("Error loading contracts:", e);
            }
        },

        getContract: function(contractName) {
            return this.contracts[contractName];
        },

        parseMessage(event) {
            // Implementação de tratamento de mensagens
        },

        pack(contractName, messageName, data) {
            if(this.contracts.has(contractName) && this.index.has(contractName)) {
                const contractIndex = this.index.get(contractName);
                const typeIndex = contractIndex?.types[messageName.replace(contractName + ".", "")];
                const contract = this.contracts.get(contractName);
                const message = contract?.lookupType(messageName);
                const dataBuffer = (message && data) ? message.encode(data).finish() : null;
                const wsCall = this.contracts.get("ws");
                const wsMessage = wsCall?.lookupType("ws.Call");
    
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
        },

        processExpressions() {
            this.contextApp = this.reactive({ 
                $template: "#app",
                rpc: this.rpc, 
                ...this.context,
                mounted: this.mounted,
                created: this.created 
            })

            const app = this.createApp(this.contextApp);

            if(typeof this.contextApp?.created === "function")
                this.contextApp?.created();

            this.app = app.mount();

            if(typeof this.contextApp?.mounted === "function")
                this.contextApp?.mounted();
        },

        rpc: {
            
            get: (name) => {
                if (name === 'tasks') {
                    return [
                        { key: 1, label: 'Task 1' },
                        { key: 2, label: 'Task 2' },
                        { key: 3, label: 'Task 3' }
                    ];
                }
                return [];
            },

            add: (contract, data) => {
                console.log(contract, data);
            },

            on: (contract, cb) => {

            }
        }
    };

    let methods = {};

    if(typeof __methods === "object"){
        for(let key in __methods)
            methods[key] = new Function(`return (${__methods[key]})`)()
    }

    let mounted = (__mounted) ? new Function(`return (${__mounted})`)() : null;
    
    global.cmmv = Object.assign({ ...methods, mounted }, cmmv, cmmvMiddleware);;
    global.cmmv.initialize(__data || {});
})(typeof window !== "undefined" ? window : global);
