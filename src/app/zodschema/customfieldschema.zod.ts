import * as z from "zod";

export const createSchemaZod = (structure: any) => {
    const schemaObj: any = {};
  
    structure.forEach((element: any) => {
      let schema: any;

      switch (element.column_type) {
          case "input":
              schema = z.string();
              break;

          case "numeric":
              schema = z
                  .string()
                  .refine((value) => value.trim() !== "" || element.is_mandatory !== 1, {
                      message: "Field must not be empty",
                  }) // Ensure it's not empty if mandatory
                  .refine((value) => !isNaN(Number(value)), {
                      message: "Must be a valid number",
                  })
                  .transform((value) => Number(value));
              break;

          case "date":
            schema = z.preprocess(
              (value) => {
                  // Convert empty strings to `undefined`
                  if (typeof value === "string" && value.trim() === "") {
                      return undefined;
                  }
                  // Convert valid date strings to Date objects
                  if (typeof value === "string") {
                      const parsedDate = new Date(value);
                      if (!isNaN(parsedDate.getTime())) {
                          return parsedDate;
                      }
                  }
                  return value; // Pass through existing Date objects
              },
              element.is_mandatory === 1
                  ? z
                        .date({ invalid_type_error: "Field must be a valid date" })
                        .refine((value) => value !== undefined, {
                            message: "Field must not be empty",
                        })
                  : z.date().optional()
            );
          break;

          case "master list":

              schema = element.is_mandatory?z.number({ invalid_type_error: "This field is required." }):z.number().nullish();
              break;

          case "list":
          schema = z.string()
          break;
              
          default:
              schema = z.any();
              break;
      }

      // Apply mandatory check for non-numeric, string-based schemas
      if (element.is_mandatory === 1 && schema instanceof z.ZodString) {
          schema = schema.min(1, "Field must not be empty");
      }

      schemaObj[element.column_name] = schema;
  });

    return z.object(schemaObj);
};