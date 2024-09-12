import mariadb from 'mariadb';

type record = {
    key: string,
    value: mariadb.Pool
};

const dbMap = function () {
    const map: record[] = [];

<<<<<<< HEAD
    public static getInstance<K, V>(): SingletonMap<K, V> {
        console.log("--------get instance-----------");
        // console.log(!SingletonMap.instance);
        if (!SingletonMap.instance) {
            console.log("++++++++New Insatnce++++++++");
            SingletonMap.instance = new SingletonMap<K, V>();
        }
        // console.log(Singl    etonMap.instance);
        return SingletonMap.instance;
    }

    public set(key: K, value: V): void {
        this.map.set(key, value);
    }

    public get(key: K): V | undefined {
        return this.map.get(key);
    }
}

const dbMap = SingletonMap.getInstance<string, mariadb.Pool>();
// console.log(dbMap)
=======

    return {
        set(key: string, value: mariadb.Pool): void {
            map.push({key, value});
            //console.log("Push host ---", key, ", connections ---", value.totalConnections());
        },
    
        get(key: string): mariadb.Pool | undefined {
            //map.forEach((val)=> console.log("Read host ---", val.key, ", connections -- ", val.value.totalConnections()));
            return map.find((val) => val.key === key)?.value;
        }
    };
}();
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df

export {dbMap};
