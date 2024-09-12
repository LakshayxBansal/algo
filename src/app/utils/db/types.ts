<<<<<<< HEAD

//jp_dev
export function bigIntToNum(obj:any){
    
    for (const key in obj ){
        
        if (typeof obj[key] === 'bigint'){
            obj[key] = Number(obj[key])
        }
    }
    return obj;
=======
export function bigIntToNum(obj:any){
    for(const key in obj){
        if(typeof obj[key]=== 'bigint'){
            obj[key] = Number(obj[key])
        }
    }
    return obj
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df
}