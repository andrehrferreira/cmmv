"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    removeUndefined(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
    }
    fixId(item) {
        if (item && typeof item === 'object') {
            if (item._id) {
                item.id = item._id.toString();
                delete item._id;
            }
            for (const key in item) {
                if (Array.isArray(item[key])) {
                    item[key] = item[key].map((element) => this.fixId(element));
                }
                else if (typeof item[key] === 'object') {
                    item[key] = this.fixId(item[key]);
                }
            }
        }
        return item;
    }
}
exports.AbstractService = AbstractService;
