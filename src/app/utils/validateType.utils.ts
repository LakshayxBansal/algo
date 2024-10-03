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
          } else if (month == 2 && day > 29) {
            errors.push(`${key}is not valid.`);
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
          // Additional types can be handled here
          break;
      }
    }
  }

  return errors.length > 0
    ? { status: 0, validateErrorStatus: 0, errors }
    : { status: 1 };
}

// export function validateData(schema: any, data: any) {

//   const errors = [];

//       if (data.endsWith("id") !== undefined && typeof data.id !== "number") {
//         errors.push("ID must be a number.");
//       }

//   if (data.age !== undefined) {
//     if (typeof data.age !== "number" || data.age <= 0) {
//       errors.push("Age must be greater than 0.");
//     }
//   }

//   const currentDate = new Date();
//   const dateFields = ["dob", "doa"];

//   for (const field of dateFields) {
//     if (data[field] !== undefined) {
//       const dateValue = new Date(data[field]);

//       if (isNaN(dateValue.getTime())) {
//         errors.push(`${field} is not a valid date.`);
//         continue;
//       }

//       if (dateValue > currentDate) {
//         errors.push(`${field} must not be greater than the current date.`);
//         continue;
//       }

//   const day = dateValue.getUTCDate();
//   const month = dateValue.getUTCMonth() + 1;
//   const year = dateValue.getUTCFullYear();

//   if (day < 1 || day > 31) {
//     errors.push(`${field} has an invalid day.`);
//   }
//   if (month < 1 || month > 12) {
//     errors.push(`${field} has an invalid month.`);
//   }
//   if (month == 2 && day > 29) {
//     errors.push(`${field}is not valid.`);
//   }
//     }
//   }

//   if (errors.length > 0) {
//     return { status: 0, validateErrorStatus: 0, errors };
//   }

//   return { status: 1 };
// }

export async function validateAndAdjustData(schema: any, data: any) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const adjustedData = { ...data };
    const errors = result.error;
    let check = false;

    const extractedErrors = errors.issues.map((error: any) => {
      if (
        error.received === "undefined" &&
        error.message.includes("Required")
      ) {
        check = true;
        return {
          path: error.path,
          message: error.message,
        };
      }
    });

    if (check) {
      return { status: 0, validateError: 0, extractedErrors: extractedErrors };
    } else {
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        const expectedType = issue.expected;

        switch (expectedType) {
          case "string":
            if (typeof adjustedData[key] !== "string") {
              adjustedData[key] = String(adjustedData[key]) || "";
            }
            break;

          case "number":
            if (typeof adjustedData[key] === "string") {
              adjustedData[key] = parseFloat(adjustedData[key] as string) || 0;
            } else {
              adjustedData[key] = Number(adjustedData[key]) || 0;
            }
            break;

          case "date":
            if (typeof adjustedData[key] === "string") {
              adjustedData[key] =
                new Date(adjustedData[key] as string) || new Date();
            } else if (!(adjustedData[key] instanceof Date)) {
              adjustedData[key] = new Date();
            }
            break;

          case "boolean":
            if (typeof adjustedData[key] !== "boolean") {
              adjustedData[key] = Boolean(adjustedData[key]);
            }
            break;

          case "undefined":
            if (typeof adjustedData[key] !== "undefined") {
              adjustedData[key] = undefined;
            }
            break;

          case "symbol":
            if (typeof adjustedData[key] !== "symbol") {
              adjustedData[key] = Symbol();
            }
            break;

          case "object":
            if (
              typeof adjustedData[key] !== "object" ||
              adjustedData[key] === null
            ) {
              adjustedData[key] = {};
            }
            break;

          case "function":
            if (typeof adjustedData[key] !== "function") {
              adjustedData[key] = function () {};
            }
            break;

          case "bigint":
            if (typeof adjustedData[key] === "string") {
              adjustedData[key] = BigInt(adjustedData[key]);
            } else {
              adjustedData[key] = BigInt(0);
            }
            break;
        }
      }
      const validatedData = validateData(schema, adjustedData);

      if (validatedData.status) {
        return { status: 1, adjustedData };
      } else {
        return { status: 0, validateErrors: validatedData };
      }
    }
  }

  return { status: 1, data: result.data };
}
