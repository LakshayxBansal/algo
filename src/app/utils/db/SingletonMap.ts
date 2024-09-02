import mariadb from 'mariadb';

type record = {
    key: string,
    value: mariadb.Pool
};

const dbMap = function () {
    const map: record[] = [];

    return {
        set(key: string, value: mariadb.Pool): void {
            map.push({key, value});
        },
    
        get(key: string): mariadb.Pool | undefined {
            return map.find((val) => val.key === key)?.value;
        }
    };
}();

export {dbMap};

/* Example usage
const mySingletonMap = SingletonMap.getInstance<string, number>();
const singletonMap = SingletonMap.getInstance<string, number>();
mySingletonMap.set('one', 1);
mySingletonMap.set('two', 2);

console.log(mySingletonMap.get('one')); // Output: 1
console.log(mySingletonMap.get('two')); // Output: 2
console.log(mySingletonMap.get('three')); // Output: undefined
*/