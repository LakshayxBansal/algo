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
            //console.log("Push host ---", key, ", connections ---", value.totalConnections());
        },
    
        get(key: string): mariadb.Pool | undefined {
            //map.forEach((val)=> console.log("Read host ---", val.key, ", connections -- ", val.value.totalConnections()));
            return map.find((val) => val.key === key)?.value;
        }
    };
}();

export {dbMap};
