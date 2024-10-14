import { ZodObject, ZodSchema, ZodOptional } from "zod";

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

export async function convertData<T>(schema: ZodSchema<T>, data: any) {
  const adjustedData: any = {};
  if (schema instanceof ZodObject) {
    for (const key in data) {
      const schemaValue = schema.shape[key];
      if (schemaValue) {
        let expectedType: string;
        if (schemaValue instanceof ZodOptional) {
          expectedType = schemaValue._def.innerType.constructor.name.replace(
            "Zod",
            ""
          );
        } else {
          expectedType = schemaValue.constructor.name.replace("Zod", "");
        }
        adjustedData[key] = adjustType(data[key], expectedType);
      } else {
        adjustedData[key] = data[key];
      }
    }
  }

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
