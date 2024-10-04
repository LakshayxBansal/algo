
type record = {
    key: string,
    value: string
};

const statusMap = function () {
    const map: record[] = [];

    return {
        set(key: string, value: string): void {
            map.push({key, value});
            //console.log("Push host ---", key, ", connections ---", value.totalConnections());
        },
    
        get(key: string): string | undefined {
            //map.forEach((val)=> console.log("Read host ---", val.key, ", connections -- ", val.value.totalConnections()));
            return map.find((val) => val.key === key)?.value;
        }
    };
}();

export {statusMap};
