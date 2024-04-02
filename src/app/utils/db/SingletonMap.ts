
export class SingletonMap<K, V> {
    private static instance: SingletonMap<any, any>;
    private map: Map<K, V>;
    private count: number;

    private constructor() {
        this.map = new Map<K, V>();
        this.count=0;
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

    public incCount() {
        this.count++;
        console.log("++++++++++++++++ count inc: count = "+ this.count);
    }
    
    public decCount() {
        this.count--;
        console.log("---------------- count dec: count = "+ this.count);

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