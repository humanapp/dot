namespace dot {
    export namespace util {
        export function wrap(lo: number, hi: number, v: number): number {
            const w = hi - lo;
            const o = v - lo;
            if (o >= 0) {
                return (o % w) + lo;
            } else {
                let wv = w + (o % w) + lo;
                if (wv >= hi) {
                    wv -= w;
                }
                return wv;
            }
        }
        export function isInRange(v: number, lo: number, hi: number) {
            return lo <= v && v < hi;
        }
    }
    export function remove<T>(
        array: T[],
        func: (v: T, index?: number) => any
    ): T[] {
        let removed = [];
        for (let i = 0, index = 0; i < array.length; index++) {
            if (func(array[i], index)) {
                removed.push(array[i]);
                array.splice(i, 1);
            } else {
                i++;
            }
        }
        return removed;
    }
}
