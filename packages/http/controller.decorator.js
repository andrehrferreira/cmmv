"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = Controller;
exports.Get = Get;
exports.Post = Post;
exports.Put = Put;
exports.Delete = Delete;
exports.Patch = Patch;
exports.Body = Body;
exports.Queries = Queries;
exports.Param = Param;
exports.Query = Query;
exports.Header = Header;
exports.Headers = Headers;
exports.Request = Request;
exports.Req = Req;
exports.Response = Response;
exports.Res = Res;
exports.Next = Next;
exports.Session = Session;
exports.Ip = Ip;
exports.HostParam = HostParam;
const controller_registry_1 = require("./controller.registry");
function Controller(prefix = '') {
    return (target) => {
        Reflect.defineMetadata('controller_prefix', prefix, target);
        controller_registry_1.ControllerRegistry.registerController(target, prefix);
    };
}
function createMethodDecorator(method, path, cb) {
    return (target, propertyKey, context) => {
        controller_registry_1.ControllerRegistry.registerRoute(target, method, path, propertyKey, context.value, cb);
    };
}
function Get(path = '', cb) {
    return createMethodDecorator('get', path, cb);
}
function Post(path = '', cb) {
    return createMethodDecorator('post', path, cb);
}
function Put(path = '', cb) {
    return createMethodDecorator('put', path, cb);
}
function Delete(path = '', cb) {
    return createMethodDecorator('delete', path, cb);
}
function Patch(path = '', cb) {
    return createMethodDecorator('patch', path, cb);
}
function createParamDecorator(paramType) {
    return (target, propertyKey, parameterIndex) => {
        const paramName = paramType.startsWith('param') ||
            paramType.startsWith('query') ||
            paramType.startsWith('header')
            ? paramType.split(':')[1]
            : paramType;
        controller_registry_1.ControllerRegistry.registerParam(target, propertyKey, paramType, parameterIndex, paramName);
    };
}
function Body() {
    return createParamDecorator('body');
}
function Queries() {
    return createParamDecorator(`queries`);
}
function Param(paramName) {
    return createParamDecorator(`param:${paramName}`);
}
function Query(queryName) {
    return createParamDecorator(`query:${queryName}`);
}
function Header(headerName) {
    return createParamDecorator(`header:${headerName}`);
}
function Headers() {
    return createParamDecorator(`headers`);
}
function Request() {
    return createParamDecorator(`request`);
}
function Req() {
    return createParamDecorator(`request`);
}
function Response() {
    return createParamDecorator(`response`);
}
function Res() {
    return createParamDecorator(`response`);
}
function Next() {
    return createParamDecorator(`next`);
}
function Session() {
    return createParamDecorator(`session`);
}
function Ip() {
    return createParamDecorator(`ip`);
}
function HostParam() {
    return createParamDecorator(`hosts`);
}
