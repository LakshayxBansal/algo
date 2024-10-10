// type record = {
//     key: string,
//     value: string
// };
const statusMap = function () {
    // const keyMap: record[] = [];
    const map: Map<string, string> = new Map();

    return {
        set(key: string, value: string): void {
            map.set(key,value);
            // keyMap.push({key, value});
            console.log("map length in set : ",map.size);
            //console.log("Push host ---", key, ", connections ---", value.totalConnections());
        },
    
        // getKey(key: string): string | undefined {

        //     // console.log("keyMap length in get : ",keyMap.length);
        //     // return keyMap.find((val) => val.key === key)?.value;
        // },

        get(key: string): string | undefined {
            console.log("map length in get : ",map.size);
            return map.get(key);
            // console.log("keyMap length in get : ",keyMap.length);
            // const keyObj = keyMap.find((val) => val.key === key);
            // return keyObj?.value;
        }
    };
}();

export {statusMap};
