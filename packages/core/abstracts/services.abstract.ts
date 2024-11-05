export abstract class AbstractService {
    name?: string; //compatibility

    removeUndefined(obj: any) {
        return Object.fromEntries(
            Object.entries(obj).filter(([_, value]) => value !== undefined),
        );
    }

    fixId(item: any): any {
        if (item && typeof item === 'object') {
            if (item._id) {
                item.id = item._id.toString();
                delete item._id;
            }

            for (const key in item) {
                if (Array.isArray(item[key])) {
                    item[key] = item[key].map((element: any) =>
                        this.fixId(element),
                    );
                } else if (typeof item[key] === 'object') {
                    item[key] = this.fixId(item[key]);
                }
            }
        }

        return item;
    }
}
