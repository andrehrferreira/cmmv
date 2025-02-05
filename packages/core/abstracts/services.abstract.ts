export abstract class AbstractService {
    name?: string; //compatibility

    removeUndefined(obj: any) {
        return Object.fromEntries(
            Object.entries(obj).filter(([_, value]) => value !== undefined),
        );
    }

    fixIds(item: any): any {
        if (item && typeof item === 'object') {
            if (item._id) {
                item.id = item._id.toString();
                delete item._id;
            }

            for (const key in item) {
                if (Array.isArray(item[key])) {
                    item[key] = item[key].map((element: any) =>
                        this.fixIds(element),
                    );
                } else if (typeof item[key] === 'object') {
                    item[key] = this.fixIds(item[key]);

                    if (item.userCreator)
                        item.userCreator = item.userCreator.toString();

                    if (item.userLastUpdate)
                        item.userLastUpdate = item.userLastUpdate.toString();
                }
            }
        }

        return item;
    }

    appendUser(payload: any, userId: any) {
        payload.userCreator = userId;
        return payload;
    }

    appendUpdateUser(payload: any, userId: any) {
        payload.userLastUpdate = userId;
        return payload;
    }
}
