namespace dot {
    export class Set<T> {
        _items: { [key: string]: T };
        constructor() {
            this._items = {};
        }
        has(key: string) {
            return this._items[key] != null;
        }
        del(key: string) {
            delete this._items[key];
        }
        set(key: string, val: T) {
            this._items[key] = val;
        }
        clear() {
            this._items = {};
        }
    }
}