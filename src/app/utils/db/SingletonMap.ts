
export class SingletonMap<K, V> {
    private static instance: SingletonMap<any, any>;
    private map: Map<K, V>;

    private constructor() {
        this.map = new Map<K, V>();
    }

    public static getInstance<K, V>(): SingletonMap<K, V> {
        if (!SingletonMap.instance) {
            SingletonMap.instance = new SingletonMap<K, V>();
        }
        return SingletonMap.instance;
    }

    public set(key: K, value: V): void {
        this.map.set(key, value);
    }

    public get(key: K): V | undefined {
        return this.map.get(key);
    }
}

/* Example usage
const mySingletonMap = SingletonMap.getInstance<string, number>();
const singletonMap = SingletonMap.getInstance<string, number>();
mySingletonMap.set('one', 1);
mySingletonMap.set('two', 2);

console.log(mySingletonMap.get('one')); // Output: 1
console.log(mySingletonMap.get('two')); // Output: 2
console.log(mySingletonMap.get('three')); // Output: undefined
*/