"use strict";
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@cmmv/core");
let AuthService = AuthService_1 = class AuthService extends core_1.Singleton {
    constructor() {
        super(...arguments);
        this.logger = new core_1.Logger('AuthService');
    }
    static async loadConfig(application) {
        const instance = AuthService_1.getInstance();
        const config = core_1.Config.get('auth');
        try {
        }
        catch (e) {
            instance.logger.error(e.message);
            console.log(e);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = tslib_1.__decorate([
    (0, core_1.Service)()
], AuthService);
