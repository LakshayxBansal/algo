import lodash from 'lodash'
// import { getExecutiveContact } from "@/app/services/executive.service";

export async function populateData(config:string, obj:any, crmApp:string) {
    // Create a map for easy lookup
    
    const extracted = extract(config)
    console.log(extracted)
    if (extracted.ents.length === 1 && extracted.ents[0] != null){
    const executive_ids : (number|null)[] = extracted.ents.map(entity => entity ? obj[entity] as number : null)
    // console.log(executive_ids)
    // const arr = await getExecutiveContact(crmApp, executive_ids) as any[]
    //     const arr = []
    // const map = new Map(arr.map(item  => [item.id, item]));
    // console.log(arr)
    // extracted.ents.map((ent) => {
    //     obj[ent] = map.get(obj[ent])})
    console.log(obj)
}
    // obj.created_by = map.get(obj.created_by);
    // obj.executive_id = map.get(obj.executive_id);
    // obj.allocated_to = map.get(obj.allocated_to);
    extracted.vars?.map((prop:string) => {
        const re = new RegExp(`\\$\\{${prop}\\}`, 'g');
        const value = lodash.get(obj, prop)
        console.log(value)
        config = config.replace(re, value);
        })

    return config;
}

function extract(jsonString: string):{vars:string[],ents:(string|null)[]}
  {
  const regex = /\$\{(.*?)\}/g;
  const matches = jsonString.match(regex);

  const extractedStrings = [...new Set(matches?.map(match => match.slice(2, -1)))];
  const extractedEntities= [...new Set(extractedStrings?.map(entity => entity.split('.').length > 1 ? entity.split('.')[0]: null))]

  return {vars : extractedStrings, ents : extractedEntities}
  }

  