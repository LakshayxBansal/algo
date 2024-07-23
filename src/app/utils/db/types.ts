
//jp_dev
export function bigIntToNum(obj:any){
    
    for (const key in obj ){
        
        if (typeof obj[key] === 'bigint'){
            obj[key] = Number(obj[key])
        }
    }
    return obj;
}