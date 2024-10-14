// import mariadb from 'mariadb';

// type record = {
//     key: string,
//     value: mariadb.Pool
// };

// const sessionDb = 'userDb';

// const dbMap = function () {
//     const map: record[] = [];
//     console.log("----------------- Map length--------: ", map.length);

//     debugger;
//     return {
//         set(key: string, value: mariadb.Pool): void {
//             map.push({key, value});
//             //console.log("Push host ---", key, ", connections ---", value.totalConnections());
//             // console.log("------pool status in map start: ----");
//             // map.forEach((val) => console.log("--- ", val.key));
//             // console.log("------pools status in map end: ----");
//         },
    
//         get(key: string): mariadb.Pool | undefined {
//             console.log("\n\n--search in pool: ----", key);
//             map.forEach((val) => console.log("----- Pool content: ", val.key));
//             const pool = map.find((val) => val.key === key);
//             return pool?.value;

//             //map.forEach((val)=> console.log("Read host ---", val.key, ", connections -- ", val.value.totalConnections()));
//             // return map.find((val) => val.key === key)?.value;
//         }
//     };
// }();

// export {dbMap};


import mariadb from 'mariadb';

type record = {
    key: string,
    value: mariadb.Pool
};

// const sessionDb = 'userDb';

class DbMap {
    private static instance: DbMap;
    private map: record[] = [];

    private constructor() {

    }

    public static getInstance(): DbMap {
        if (!DbMap.instance) {
            DbMap.instance = new DbMap();
            console.log("----------------- created dbmap--------: ");
        }
        return DbMap.instance;
    }

    public set(key: string, value: mariadb.Pool): void {
        if (!(this.map.find((val) => val.key === key))) {
            this.map.push({key, value});
        }
    }

    public get(key: string): mariadb.Pool | undefined {
        // console.log("\n\n--search in pool: ----", key);
        console.log("----- Pool length: ", this.map.length);
        return this.map.find((val) => val.key === key)?.value;

        //this.map.forEach((val)=> console.log("Read host ---", val.key, ", connections -- ", val.value.totalConnections()));
        // return this.map.find((val) => val.key === key)?.value;
    }
}

// Module-level variable to store the singleton instance
let dbMapInstance: DbMap | null = null;

if (!dbMapInstance) {
    dbMapInstance = DbMap.getInstance();
}

const dbMap = dbMapInstance;

export { dbMap };