"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const jwt = require("jsonwebtoken");
const core_1 = require("@cmmv/core");
function Auth(roles) {
    return (target, propertyKey, descriptor) => {
        const middleware = (req, res, next) => {
            const cookieName = core_1.Config.get('server.session.options.sessionCookieName', 'token');
            let token = req.cookies ? req.cookies[cookieName] : null;
            if (!token)
                token = req.headers.authorization?.split(' ')[1] || null;
            if (!token)
                return res.status(401).send('Unauthorized');
            jwt.verify(token, core_1.Config.get('auth.jwtSecret'), (err, decoded) => {
                if (err)
                    return res.status(401).send('Unauthorized');
                if (roles &&
                    (!decoded.roles ||
                        !roles.some(role => decoded.roles.includes(role))))
                    return res.status(403).send('Forbidden');
                req.user = decoded;
                next();
            });
        };
        const existingFields = Reflect.getMetadata('route_metadata', descriptor.value) || {};
        const newField = existingFields?.middleware
            ? { middleware: [...existingFields?.middleware, middleware] }
            : { middleware: [middleware] };
        Reflect.defineMetadata('route_metadata', { ...existingFields, ...newField }, descriptor.value);
    };
}
