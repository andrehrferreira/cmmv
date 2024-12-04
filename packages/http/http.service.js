"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@cmmv/core");
let HttpService = class HttpService extends core_1.AbstractService {
    constructor() {
        super(...arguments);
        this.name = 'http';
    }
    async request(config) {
        const Axios = (await Promise.resolve().then(() => require('axios'))).default;
        return Axios.request(config);
    }
    async get(url, config) {
        const Axios = (await Promise.resolve().then(() => require('axios'))).default;
        return Axios.get(url, config);
    }
    async delete(url, config) {
        const Axios = (await Promise.resolve().then(() => require('axios'))).default;
        return Axios.delete(url, config);
    }
    async head(url, config) {
        const Axios = (await Promise.resolve().then(() => require('axios'))).default;
        return Axios.head(url, config);
    }
    async post(url, data, config) {
        const Axios = (await Promise.resolve().then(() => require('axios'))).default;
        return Axios.post(url, data, config);
    }
    async put(url, data, config) {
        const Axios = (await Promise.resolve().then(() => require('axios'))).default;
        return Axios.put(url, data, config);
    }
    async patch(url, data, config) {
        const Axios = (await Promise.resolve().then(() => require('axios'))).default;
        return Axios.patch(url, data, config);
    }
};
exports.HttpService = HttpService;
exports.HttpService = HttpService = tslib_1.__decorate([
    (0, core_1.Service)('http')
], HttpService);
