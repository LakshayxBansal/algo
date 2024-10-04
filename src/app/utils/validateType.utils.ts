import { z, ZodTypeAny, ZodOptional, Schema } from "zod";

function validateData(schema: any, data: any) {
  const errors: string[] = [];

  const schemaKeys = Object.keys(schema);

  for (const key of schemaKeys) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      const expectedType = schema[key].type;

      switch (expectedType) {
        case "number":
          if (typeof value !== "number") {
            errors.push(`${key} must be a number.`);
          } else if (typeof value === "string" && !/^\d+$/.test(value)) {
            errors.push(`${key} must not be alphanumeric.`);
          }
          break;

        case "string":
          if (typeof value !== "string") {
            errors.push(`${key} must be a string.`);
          }
          break;

        case "boolean":
          if (typeof value !== "boolean") {
            errors.push(`${key} must be a boolean.`);
          }
          break;

        case "date":
          const dateValue = new Date(value);

          const day = dateValue.getUTCDate();
          const month = dateValue.getUTCMonth() + 1;
          const year = dateValue.getUTCFullYear();

          if (isNaN(dateValue.getTime()) || dateValue > new Date()) {
            errors.push(
              `${key} must be a valid date and cannot be in the future.`
            );
          } else if (day < 1 || day > 31) {
            errors.push(`${key} has an invalid day.`);
          } else if (month < 1 || month > 12) {
            errors.push(`${key} has an invalid month.`);
          } else if (year % 4 == 0 && month == 2 && day > 29) {
            errors.push(`${key} is not valid.`);
          }

          break;

        case "age":
          if (typeof value !== "number" || value < 0) {
            errors.push("Age must be a non-negative number.");
          }
          break;

        case "id":
          if (key.endsWith("id") && typeof value !== "number") {
            errors.push(`${key} must be a number.`);
          } else if (typeof value === "string" && !/^\d+$/.test(value)) {
            errors.push(`${key} must not be alphanumeric.`);
          }
          break;

        default:
          errors.push("Unknown Error");
          break;
      }
    }
  }

  return errors.length > 0
    ? { status: 0, validateErrorStatus: 0, errors }
    : { status: 1 };
}

// export async function convertData(schema: any, data: any) {

//   const result = schema.safeParse(data);

//   if (!result.success) {
//     const adjustedData = { ...data };
//     const errors = result.error;
//     let check = false;

//     const extractedErrors = errors.issues.map((error: any) => {
//       if (
//         error.received === "undefined" &&
//         error.message.includes("Required")
//       ) {
//         check = true;
//         return {
//           path: error.path,
//           message: error.message,
//         };
//       }
//     });

//     if (check) {
//       return { status: 0, validateError: 0, extractedErrors: extractedErrors };
//     } else {
//       for (const issue of result.error.issues) {
//         const key = issue.path[0];
//         const expectedType = issue.expected;

//         switch (expectedType) {
//           case "string":
//             if (typeof adjustedData[key] !== "string") {
//               adjustedData[key] = String(adjustedData[key]) || "";
//             }
//             break;

//           case "number":
//             if (typeof adjustedData[key] === "string") {
//               adjustedData[key] = parseFloat(adjustedData[key] as string) || 0;
//             } else {
//               adjustedData[key] = Number(adjustedData[key]) || 0;
//             }
//             break;

//           case "date":
//             if (typeof adjustedData[key] === "string") {
//               adjustedData[key] =
//                 new Date(adjustedData[key] as string) || new Date();
//             } else if (!(adjustedData[key] instanceof Date)) {
//               adjustedData[key] = new Date();
//             }
//             break;

//           case "boolean":
//             if (typeof adjustedData[key] !== "boolean") {
//               adjustedData[key] = Boolean(adjustedData[key]);
//             }
//             break;

//           case "undefined":
//             if (typeof adjustedData[key] !== "undefined") {
//               adjustedData[key] = undefined;
//             }
//             break;

//           case "symbol":
//             if (typeof adjustedData[key] !== "symbol") {
//               adjustedData[key] = Symbol();
//             }
//             break;

//           case "object":
//             if (
//               typeof adjustedData[key] !== "object" ||
//               adjustedData[key] === null
//             ) {
//               adjustedData[key] = {};
//             }
//             break;

//           case "function":
//             if (typeof adjustedData[key] !== "function") {
//               adjustedData[key] = function () {};
//             }
//             break;

//           case "bigint":
//             if (typeof adjustedData[key] === "string") {
//               adjustedData[key] = BigInt(adjustedData[key]);
//             } else {
//               adjustedData[key] = BigInt(0);
//             }
//             break;
//         }
//       }
//       const validatedData = validateData(schema, adjustedData);

//       if (validatedData.status) {
//         return { status: 1, adjustedData };
//       } else {
//         return { status: 0, validateErrors: validatedData };
//       }
//     }
//   }

//   return { status: 1, data: result.data };
// }

// async function typeChange(schemaType: any, data: object, key: any){

//     if(typeof (data[key])!= schemaType){
//         data[key]=schemaType(data[key]);
//     }
// }

// const adjustType = (value: any, expectedType: string) => {
//     switch (expectedType) {
//       case "string":
//         return String(value) || "";
//       case "number":
//         return typeof value === "string" ? parseFloat(value) || 0 : Number(value) || 0;
//       case "date":
//         return typeof value === "string" ? new Date(value) : new Date();
//       case "boolean":
//         return Boolean(value);
//       case "undefined":
//         return undefined;
//       case "symbol":
//         return Symbol();
//       case "object":
//         return (typeof value === "object" && value !== null) ? value : {};
//       case "function":
//         return typeof value === "function" ? value : () => {};
//       case "bigint":
//         return typeof value === "string" ? BigInt(value) : BigInt(0);
//       default:
//         return value;
//     }
//   };

function adjustType(value: any, expectedType: string) {
  switch (expectedType) {
    case "String":
      return String(value) || "";
    case "Number":
      return typeof value === "string"
        ? parseFloat(value) || 0
        : Number(value) || 0;
    case "Date":
      return typeof value === "string" ? new Date(value) : new Date();
    case "boolean":
      return Boolean(value);
    case "undefined":
      return undefined;
    case "symbol":
      return Symbol();
    case "object":
      return typeof value === "object" && value !== null ? value : {};
    case "function":
      return typeof value === "function" ? value : () => {};
    case "bigint":
      return typeof value === "string" ? BigInt(value) : BigInt(0);
    default:
      return value;
  }
}

export async function convertData(schema: any, data: any) {
  // const adjustedData = {};
  // const adjustedData: Record<string, any> = {};
  const adjustedData: any = {};
  //   const temp: z.infer<typeof schema> = {};
  type ContactType = z.infer<typeof schema>;

  for (const key in data) {
    if (schema.shape[key]) {
      //   const expectedType = schema.shape[key]._def.innerType;
      // const expectedType = schema.shape[key].constructor.name;
      let expectedType = schema.shape[key]._def.innerType._def.typeName;
      (expectedType = expectedType.replace("Zod", "")),
        // const expectedType = typeof (ContactType);
        console.log("expected Type", expectedType);
      adjustedData[key] = adjustType(data[key], expectedType);
    } else {
      adjustedData[key] = data[key];
    }
  }
  // for (const key in data) {
  //     const schemaValue = schema.shape[key];
  //     if (schemaValue) {
  //       let expectedType: string;
  //       if (schemaValue instanceof ZodOptional) {
  //         expectedType = schemaValue._def.innerType._def.typeName;
  //       } else {
  //         expectedType = schemaValue._def.typeName;
  //       }
  //       adjustedData[key] = adjustType(data[key], expectedType);
  //     } else {
  //       adjustedData[key] = data[key];
  //     }
  //   }

  const result = schema.safeParse(adjustedData);

  if (!result.success) {
    const errors = result.error.issues;
    const extractedErrors = errors
      .filter(
        (error: any) =>
          error.received === "undefined" && error.message.includes("Required")
      )
      .map((error: any) => ({
        path: error.path,
        message: error.message,
      }));

    return { status: 0, validateError: 0, extractedErrors };
  }

  const validatedData = validateData(schema, adjustedData);

  if (validatedData.status) {
    return { status: 1, adjustedData };
  } else {
    return { status: 0, validateErrors: validatedData };
  }
}
