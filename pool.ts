namespace dot {
    export class Pool<T> {
        active: T[] = [];
        pool: T[] = [];
        constructor(
            private factoryFn: () => T,
            private initFn: (obj: T, args: any[]) => void) { }
        alloc(args: any[]): T {
            let obj: any;
            if (this.pool.length) {
                obj = this.pool.pop();
            } else {
                obj = this.factoryFn();
            }
            this.initFn(obj, args);
            this.active.push(obj);
            return obj;
        }
        reset() {
            this.pool = this.pool.concat(this.active);
            this.active.splice(0, this.active.length);
        }
        update(fn: (obj: T) => boolean) {
            remove(this.active, obj => fn(obj), this.pool);
        }
    }
}