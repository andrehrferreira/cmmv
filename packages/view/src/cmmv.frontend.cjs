(function(global) {
    const cmmv = {
        socket: null,

        contractIndex: {},

        contracts: {},

        initialize(){
            this.socket = new WebSocket(
                window.location.href.            
                replace("https", "wss").
                replace("http", "ws")
            );

            this.socket.addEventListener("message", this.parseMessage);
            this.socket.binaryType = 'arraybuffer';
        },

        addContracts: function(jsonContracts) {
            try {
                this.contractIndex = jsonContracts.index;

                for (let contractName in jsonContracts.contracts) {
                    if (jsonContracts.contracts.hasOwnProperty(contractName)){
                        let contract = protobuf.Root.fromJSON(jsonContracts.contracts[contractName]);
                        this.contracts[contractName] = contract;         
                    }             
                }

                console.log("Loaded contracts:", this.contracts);
            } catch (e) {
                console.error("Error loading contracts:", e);
            }
        },

        getContract: function(contractName) {
            return this.contracts[contractName];
        },

        parseMessage(event){

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
            }
            else{
                console.error(`Not found in contract list ${contractName}.${messageName}`);
                return null;
            }
        },

        rpc: {

        }
    };

    global.cmmv = cmmv;
    global.cmmv.initialize();
})(typeof window !== "undefined" ? window : global);
