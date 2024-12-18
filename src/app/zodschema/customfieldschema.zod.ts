import * as z from "zod";

export const createSchemaZod = (structure: any) => {
    const schemaObj: any = {};
  
    structure.forEach((element:any) => {
      switch (element.column_type) {
        case 'input':
          schemaObj[element.column_name] = z.string().min(10,"too short");
          break;
        case 'numeric':
          schemaObj[element.column_name] = z.string().transform((value) => Number(value))
          .refine((num) => !isNaN(num), { message: "Age must be a valid number" }) ;
          break;
        case 'date':
          schemaObj[element.column_name] = z.string().datetime();
          break;
        // Add more types as needed
        case 'master list':
          schemaObj[element.column_name] = z.number().nullish();
          break;
        default:
          schemaObj[element.column_name] = z.any();
          break;
      }
    });

    return z.object(schemaObj);
};