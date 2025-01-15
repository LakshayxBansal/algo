import * as z from "zod";
import { checkPhone, checkPhoneEmpty } from "../utils/phoneUtils";
import { adjustToLocal } from "../utils/utcToLocal";
import dayjs from "dayjs";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$|^$/
);
// const panRegEx = new RegExp(/^[a-zA-Z0-9]{5}[0-9]{4}[a-zA-Z0-9]$/);
const panRegEx = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]$/);

export const emailRegex = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
const aadhaarRegex = new RegExp(/^\d{12}$/); //AADHAR REGEX CHANGED
const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
);

export const docDescriptionSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1,"Field can't be empty").max(255),
  fileName: z.string().optional(),
  objectId: z.number().optional(),
  objectTypeId: z.number().optional(),
  file: z.string().min(1,"please choose file").optional(),
  fileType: z.string().optional(),
  docId: z.string().optional(),
});

export const signInSchema = z
  .object({
    email: z.string().optional(),
    phone: z
      .string()
      .min(1, "Please enter phone number")
      .refine((val) => checkPhoneEmpty(val), {
        message: "Please enter phone number",
        path: ["phone"],
      })
      .optional(),
    password: z.string().min(1, "Please enter password"),
  })
  .refine(
    (schema) => {
      return !(schema.email === "");
    },
    { message: "Please enter email", path: ["email"] }
  );

export const userSchema = z
  .object({
    // email: z.union([z.string().optional(), z.string().email()]),
    email: z
      .string()
      .regex(emailRegex, "Input must be in email format")
      .optional(),
    password: z
      .string()
      .min(8)
      .max(50)
      .regex(
        passwordRegex,
        "Minimum 8 characters with 1 letter, 1 number, and 1 special character."
      ),
    name: z.string().min(1, "Name must not be empty").max(45),
    phone: z
      .string()
      .min(1, "Please provide phone")
      .refine((val) => checkPhone(val), {
        message: "Please provide a valid Phone No",
        path: ["phone"],
      })
      .optional(),
    contact: z.string().optional(),
    repassword: z.string().max(50),
    provider: z.string().max(15).optional(),
  })
  .refine(
    (schema) => {
      return schema.password === schema.repassword;
    },
    { message: "Passwords should match", path: ["password", "repassword"] }
  )
  .refine(
    (schema) => {
      return !(schema.email === "");
    },
    { message: "Please provide email", path: ["email"] }
  );

/*
refine(schema => {
  return (
      schema.email === '' && 
      schema.phone === ''); 
}, {message: "please provide email, or phone no", path: ["email", "phone"]})
*/
export const organisationSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(75, "Field must contain at most 75 character(s)"),
  alias: z
    .string()
    .max(75, "Field must contain at most 75 character(s)")
    .optional(),
  printName: z
    .string()
    .max(75, "Field must contain at most 75 character(s)")
    .optional(),
  address1: z
    .string()
    .max(75, "Field must contain at most 75 character(s)")
    .optional(),
  address2: z
    .string()
    .max(75, "Field must contain at most 75 character(s)")
    .optional(),
  city: z
    .string()
    .max(75, "Field must contain at most 75 character(s)")
    .optional(),
  docData: z.array(docDescriptionSchema).optional(),
  state_id: z.number().optional(),
  state: z.string().optional(),
  country_id: z.number().optional(),
  country: z.string().optional(),
  pan: z.union([
    z.literal(""),
    z.string().max(10).regex(panRegEx, "Invalid PAN number!"),
  ]),
  gstin: z.union([z.string().optional(), z.string().min(10)]),
  pincode: z
    .string()
    .max(15, "Field must contain at most 15 character(s)")
    .optional(),
  stamp: z.number().optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
  c_col1: z.string().optional(),
  c_col2: z.string().optional(),
  c_col3: z.string().optional(),
  c_col4: z.string().optional(),
  c_col5: z.string().optional(),
  c_col6: z.string().optional(),
  c_col7: z.string().optional(),
  c_col8: z.string().optional(),
  c_col9: z.string().optional(),
  c_col10: z.string().optional(),
});

export const deptSchema = z.object({
  name: z.string().min(1).max(45),
});

const contactDetailsSchema = z
  .object({
    email: z.union([z.literal(""), z.string().email().max(100)]),
    mobile: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
    whatsapp: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
  })
  .partial()
  .refine(
    ({ email, mobile, whatsapp }) =>
      mobile !== "" || email !== "" || whatsapp !== "",
    {
      message: "One of the fields must be defined",
    }
  );

export const ProductSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(75, "Field must contain at most 75 character(s)"),
  stamp: z.number().optional(),
  group: z.number().optional(),
  group_name: z.string().optional(),
  alias: z
    .string()
    .max(75, "Field must contain at most 75 character(s)")
    .optional(),
  unit: z.number().optional(),
  unit_name: z.string().optional(),
  hsn_code: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
});

export const productToListFormSchema = z.object({
  id: z.number().optional(),
  enquiry_id: z.number().optional(),
  product: z
    .string()
    .min(1)
    .max(60)
    .optional()
    .refine((val) => val !== undefined && val.length !== 0, {
      message: "Product Name Empty !",
      path: ["product"],
    }),
  product_id: z.number().min(1),
  quantity: z
    .number()
    .min(1, { message: "Quantity cannot be empty or zero!" })
    .refine((val) => val >= 0, { message: "Quantity cannot be negative!" })
    .refine((val) => val <= 10000000, {
      message: "Quantity cannot exceed 10000000!",
    }),
  unit: z
    .string()
    .min(1)
    .optional()
    .refine((val) => val !== undefined && val.length !== 0, {
      message: "Unit Name Empty !",
      path: ["unit"],
    }),
  unit_id: z.number().min(1),
  remarks: z.string().max(5000).optional(),
});

export const productToListFormArraySchema = z.array(productToListFormSchema);

export const UnitSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(50, "Field must contain at most 50 character(s)"),
  stamp: z.number().optional(),
  group_id: z.number().optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
});

/**
 * validate the add person to person table
 */
export const contactSchema = z.object({
  id: z.number().optional(),
  alias: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  print_name: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  pan: z.union([
    z.literal(""),
    z.string().max(10).regex(panRegEx, "Invalid PAN number!"),
  ]),
  aadhaar: z.union([z.literal(""), z.string().optional()]),
  address1: z.string().max(75, "Field must contain at most 75 character(s)").optional(),
  address2: z.string().max(75, "Field must contain at most 75 character(s)").optional(),
  pincode: z.string().max(15, "Field must contain at most 15 character(s)").optional(),
  docData: z.array(docDescriptionSchema).optional(),
  email: z.union([z.literal(""), z.string().email().max(100)]),
  mobile: z.string().refine((val) => checkPhone(val), {
    message: "Please provide a valid Phone No",
    path: ["mobile"],
  }).optional(),
  whatsapp: z.string().refine((val) => checkPhone(val), {
    message: "Please provide a valid Whatsapp No",
    path: ["whatsapp"],
  }).optional(),
  dob: z.date().optional(),
  doa: z.date().optional(),
  contactGroup_id: z.number(),
  contactGroup: z.string().min(1, 'Enter Field'),
  state: z.string().optional(),
  area: z.string().optional(),
  area_id: z.number().optional(),
  department: z.string().optional(),
  organisation: z.string().optional(),
  department_id: z.number().optional(),
  organisation_id: z.number().optional(),
  state_id: z.number().optional(),
  country_id: z.number().optional(),
  country: z.string().optional(),
  city: z
    .string()
    .max(75, "Field must contain at most 75 character(s)")
    .optional(),
  stamp: z.number().optional(),
  c_col1: z.union([z.string(), z.number()]).optional().nullish(),
  c_col2: z.union([z.string(), z.number()]).optional(),
  c_col3: z.union([z.string(), z.number()]).optional(),
  c_col4: z.union([z.string(), z.number()]).optional(),
  c_col5: z.union([z.string(), z.number()]).optional(),
  c_col6: z.union([z.string(), z.number()]).optional(),
  c_col7: z.union([z.string(), z.number()]).optional(),
  c_col8: z.union([z.string(), z.number()]).optional(),
  c_col9: z.union([z.string(), z.number()]).optional(),
  c_col10: z.union([z.string(), z.number()]).optional(),
  c_col1_id:z.number().optional().nullish(),
  c_col1_name:z.string().optional()
});

export const areaSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .max(60, "Field must contain atmost 60 character(s)")
    .min(1, "Field must contain atleast 1 character(s)"),
  stamp: z.number().optional(),
});

export const stateListSchema = z.object({
  id: z.number().optional(),
  country: z.string().max(60).optional(),
  state_id: z.number().optional(),
  state: z.string().max(60).optional(),
  name: z.string().min(1, "Field must not be empty").max(60),
  alias: z.string().min(1).max(45).optional(),
  country_id: z.number(),
  stamp: z.number().optional(),
});

export const executiveSchema = z
  .object({
    id: z.number().optional(),
    alias: z
      .string()
      .max(60, "Field must contain atmost 60 character(s)")
      .optional(),
    name: z
      .string()
      .min(1, "Field must conatin atleast 1 character")
      .max(60, "Field must contain atmost 60 character(s)"),
    address1: z
      .string()
      .max(75, "Field must contain atmost 60 character(s)")
      .optional(),
    address2: z
      .string()
      .max(75, "Field must contain atmost 60 character(s)")
      .optional(),
    city: z
      .string()
      .max(75, "Field must contain atmost 60 character(s)")
      .optional(),
    state_id: z.number().optional(),
    state: z
      .string()
      .max(60, "Field must contain atmost 60 character(s)")
      .optional(),
    pincode: z
      .string()
      .max(15, "Field must contain atmost 15 character(s)")
      .optional(),
    country_id: z.number().optional(),
    country: z
      .string()
      .max(60, "Field must contain atmost 60 character(s)")
      .optional(),
    email: z
      .union([
        z.literal(""),
        z.string().regex(emailRegex, "Invalid Email Format!"),
      ])
      .optional(),
    mobile: z
      .union([z.literal(""), z.string().regex(phoneRegex, "Invalid Number!")])
      .refine((val) => checkPhone(val), {
        message: "Please provide a valid Phone No",
        path: ["phone"],
      })
      .optional(),
    whatsapp: z
      .union([z.literal(""), z.string().regex(phoneRegex, "Invalid Number!")])
      .refine((val) => checkPhone(val), {
        message: "Please provide a valid Phone No",
        path: ["phone"],
      })
      .optional(),
    created_by: z.number().optional(),
    created_on: z.union([z.literal(""), z.date().optional()]),
    modified_by: z.number().optional(),
    modified_on: z.union([z.literal(""), z.date().optional()]),
    stamp: z.number().optional(),
    dob: z.union([z.literal(""), z.date().optional()]),
    doa: z.union([z.literal(""), z.date().optional()]),
    doj: z.union([z.literal(""), z.date().optional()]),
    docData: z.array(docDescriptionSchema).optional(),
    area_id: z.number().optional(),
    area: z.string().max(60).optional(),
    call_type_id: z.number().optional(),
    call_type: z.string().min(1).max(45),
    crm_user: z.string().max(60).optional(),
    crm_user_id: z.number().optional(),
    prev_crm_user_id: z.number().optional(),
    crm_map_id: z.number().optional(),
    role_id: z.number().optional(),
    role: z.string().min(1, "Select Field").max(45), //Remove it from optional
    executive_dept_id: z.number().optional(),
    executive_dept: z.string().min(1, "Select Field").max(45),
    executive_group_id: z.number().optional(),
    executive_group: z.string().max(75).optional(),
    pan: z.union([
      z.literal(""),
      z.string().min(10).regex(panRegEx, "Invalid PAN Number!"),
    ]),
    // aadhaar: z.union([z.literal(""), z.string().max(20)]),
    aadhaar: z.union([z.literal(""), z.string().optional()]),
    c_col1: z.string().optional(),
    c_col2: z.string().optional(),
    c_col3: z.string().optional(),
    c_col4: z.string().optional(),
    c_col5: z.string().optional(),
    c_col6: z.string().optional(),
    c_col7: z.string().optional(),
    c_col8: z.string().optional(),
    c_col9: z.string().optional(),
    c_col10: z.string().optional(),
  })
  .refine(
    (schema) => {
      return !(schema.email === "" && schema.mobile === "");
    },
    { message: "please provide email, or phone no", path: ["mobile", "email"] }
  );
/**
 * validate enquiry header schema
 */

export const enquiryHeaderSchema = z.object({
  id: z.number().optional(),
  enq_number: z
    .string()
    .min(1, { message: "Field must not be empty" })
    .max(75, {
      message: "Field must contain atmost 75 character(s)",
    }),
  date: z.string().max(20, "Field must not be greater than 20 character(s)").nullable().
    refine((val) => { 
        if(val?.length === 0 || val === null) return true;
        
        const now = dayjs(); // Current date and time in GMT
        const date = dayjs(adjustToLocal(val)); // Parse `val` without any GMT adjustment
        // Compare Day.js objects
        return date.isBefore(now);
      },{
        message:"Date should not be greater than current date",
      }),
  auto_number: z.number().optional(),
  contact_id: z.number().min(1),
  contact: z.string().min(1, { message: "Field must not be empty" }).max(60),
  received_by_id: z.number().min(1),
  received_by: z.string().min(1, { message: "Field by must not be empty" }),
  category_id: z.number().min(1),
  category: z.string().min(1, { message: "Field must not be empty" }),
  source_id: z.number().min(1),
  source: z.string().min(1, { message: "Field must not be empty" }),
  stamp: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.date().optional(),
  voucher_number : z.string().optional(),
  call_receipt_remark: z
    .string()
    .max(5000, {
      message: "Field must contain at most 5000 character(s)",
    })
    .optional(),
});

/**
 * validate enquiry ledger schema
 */
export const enquiryLedgerSchema = z.object({
  enquiry_id: z.number().optional(),
  status_version: z.number().optional(),
  allocated_to_id: z.number().min(0).optional(),
  allocated_to: z.string().max(60).optional(),
  date: z.string().max(20, "Field must not be greater than 20 character(s)").nullable().
    refine((val) => { 
        if(val?.length === 0 || val === null) return true;
        
        const now = dayjs(); // Current date and time in GMT
        const date = dayjs(adjustToLocal(val)); // Parse `val` without any GMT adjustment
        // Compare Day.js objects
        return date.isBefore(now);
      },{
        message:"Date should not be greater than current date",
      }),
  status_id: z.number().min(1),
  sub_status: z.string().min(1, { message: "Field must not be empty" }),
  sub_status_id: z.number().min(1),
  action_taken_id: z.number().nullable().optional(),
  action_taken: z.string().optional(),
  next_action_id: z.number().nullable().optional(),
  next_action: z.string().optional(),
  next_action_date: z.string().min(0).max(20).nullable().optional(),
  suggested_action_remark: z
    .string()
    .max(5000, {
      message: "Field must contain at most 5000 character(s)",
    })
    .optional(),
  action_taken_remark: z
    .string()
    .max(5000, {
      message: "Field must contain at most 5000 character(s)",
    })
    .optional(),
  closure_remark: z
    .string()
    .max(5000, {
      message: "Field must contain at most 5000 character(s)",
    })
    .optional(),
  enquiry_tran_type: z.number().optional(),
  id: z.number().optional(),
  active: z.number().optional(),
  c_col1: z.string(),
  c_col2: z.string(),
  c_col3: z.string(),
  c_col4: z.string(),
  c_col5: z.string(),
  c_col6: z.string(),
  c_col7: z.string(),
  c_col8: z.string(),
  c_col9: z.string(),
  c_col10: z.string(),
});

export const enquiryDataSchema = enquiryHeaderSchema.merge(enquiryLedgerSchema);

/**
 * support ticket schema
 */
const getCurrentDateTime = () => {
  const now = new Date();
  return now;
};

export const supportHeaderSchema = z.object({
  id: z.number().optional(),
  tkt_number: z
    .string()
    .min(1, "Field must not be empty")
    .max(75, "Field must contain at most 75 character(s)"),
  date: z.string().max(20, "Field must not be greater than 20 character(s)").nullable().
  refine((val) => { 
      if(val?.length === 0 || val === null) return true;
      
      const now = dayjs(); // Current date and time in GMT
      const date = dayjs(adjustToLocal(val)); // Parse `val` without any GMT adjustment
      // Compare Day.js objects
      return date.isBefore(now);
    },{
      message:"Date should not be greater than current date",
    }),
  auto_number: z.number().optional(),
  contact_id: z.number().min(1, "Field must not be empty"),
  contact: z.string().min(1, "Field must not be empty").max(60),
  received_by_id: z.number().min(1, "Field must not be empty"),
  received_by: z.string().min(1, "Field by must not be empty").max(60),
  category_id: z.number().min(1, "Field must not be empty"),
  category: z.string().min(1, "Field must not be empty").max(60),
  stamp: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.date().optional(),
  call_receipt_remark: z
    .string()
    .max(5000, "Field must contain at most 5000 character(s)")
    .optional(),
  modified_by_name: z.string().max(60).optional(),
  created_by_name: z.string().max(60).optional(),
  voucher_number : z.string().optional(),
});

export const supportLedgerSchema = z.object({
  ticket_id: z.number().optional(),
  status_version: z.number().optional(),
  allocated_to_id: z.number().min(0).nullable().optional(),
  allocated_to: z.string().max(60).optional(),
  date: z.string().max(20, "Field must not be greater than 20 character(s)").nullable().
  refine((val) => { 
      if(val?.length === 0 || val === null) return true;
      
      const now = dayjs(); // Current date and time in GMT
      const date = dayjs(adjustToLocal(val)); // Parse `val` without any GMT adjustment
      // Compare Day.js objects
      return date.isBefore(now);
    },{
      message:"Date should not be greater than current date",
    }),
  status_id: z.number().min(1),
  sub_status: z.string().min(0).max(50),
  sub_status_id: z.number().min(1, "Field must not be empty"),
  action_taken_id: z.number().min(0).nullable().optional(),
  action_taken: z.string().min(0).max(60).optional(),
  next_action_id: z.number().min(0).nullable().optional(),
  next_action: z.string().max(60).optional(),
  next_action_date: z.string().min(0).max(20).optional(),
  suggested_action_remark: z
    .string()
    .max(5000, "Field must contain at most 5000 character(s)")
    .optional(),
  action_taken_remark: z.string().max(5000).optional(),
  closure_remark: z.string().max(5000).optional(),
  ticket_tran_type: z.number().optional(),
  id: z.number().optional(),
  active: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_by_name: z.string().max(60).optional(),
  created_by_name: z.string().max(60).optional(),
  allocated_to_name: z.string().max(60).optional(),
  stamp: z.number().optional(),
  custom_id: z.number().optional(),
  c_col1: z.string(),
  c_col2: z.string(),
  c_col3: z.string(),
  c_col4: z.string(),
  c_col5: z.string(),
  c_col6: z.string(),
  c_col7: z.string(),
  c_col8: z.string(),
  c_col9: z.string(),
  c_col10: z.string(),
});

export const supportTicketSchema =
  supportHeaderSchema.merge(supportLedgerSchema);

export const supportProductSchema = z.object({
  id: z.number().min(1, "Field must not be empty").optional(),
  product_id: z.number().min(1),
  product: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  quanity: z.number().min(1).optional(),
  unit_id: z.number().min(1).nullable().optional(),
  unit: z.string().max(60).optional(),
  stamp: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_by_name: z.string().max(60).optional(),
  created_by_name: z.string().max(60).optional(),
});

export const supportProductArraySchema = z.array(supportProductSchema);

/**
 * contact group
 */
export const contactGroupSchema = z.object({
  id: z.number().optional(),
  alias: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  parent: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
});

/**
 * product group
 */
export const productGroupSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  alias: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  parent: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  is_parent: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.date().optional(),
});

export const currencySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  symbol: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  shortForm: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  decimal_places: z.string().min(1).max(60),
  currency_system: z.string().min(1).max(60),
  stamp: z.number().optional(),
});
/**
 * Executive Role
 */
export const executiveRoleSchema = z.object({
  id: z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most of 60 character(s)"),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  parentRole: z.string().max(60).optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
  department_id: z.number().optional(),
});

/**
 * Executive Group
 */
export const executiveGroupSchema = z.object({
  id: z.number().optional(),
  alias: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  parent: z
    .string()
    .max(60, "Field must contain at most 60 character(s)")
    .optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
});

/**
 * Executive Dept
 */
export const executiveDeptSchema = z.object({
  id: z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  stamp: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
  c_col1: z.string().optional(),
  c_col2: z.string().optional(),
  c_col3: z.string().optional(),
  c_col4: z.string().optional(),
  c_col5: z.string().optional(),
  c_col6: z.string().optional(),
  c_col7: z.string().optional(),
  c_col8: z.string().optional(),
  c_col9: z.string().optional(),
  c_col10: z.string().optional(),
});

/**
 * used for passing values to autocomplete
 */
export const optionsData = z.object({
  id: z.number(),
  name: z.string(),
});

export const countrySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  alias: z
    .string()
    .max(45, "Field must contain at most 45 character(s)")
    .optional(),
  stamp: z.number().optional(),
});

export const stateSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(60, "Field must contain at most 60 character(s)"),
  alias: z
    .string()
    .max(45, "Field must contain at most 45 character(s)")
    .optional(),
  stamp: z.number().optional(),
  country_id: z.number().refine((val) => val !== 0, {
    message: "Field must not be empty",
    path: ["country"],
  }),

  // .number({
  //   required_error: "Age is required",
  //   invalid_type_error: "Country can not be empty",
  // })
  // .refine(
  //   (val) => {
  //     return isNaN(val) || val !== undefined;
  //   },
  //   {
  //     message: "Country name must not be empty",
  //     path: ["country"],
  // ),
});

/**
 * used for passing values to add dialogs
 */
export const addEntityDlg = z.object({
  open: z.boolean(),
  data: z.string(),
});

export const modifyEntityDlg = z.object({
  open: z.boolean(),
  data: z.object({}),
});

export const deleteEntityDlg = z.object({
  open: z.boolean(),
  data: z.object({}),
});

/**
 * zod schema for menu options
 */
export const menuOption = z.object({
  id: z.number(),
  name: z.string().min(1).max(30),
  short_name: z.string().min(1).max(30),
  parent_id: z.number(),
  icon: z.string().min(1).max(30),
  href: z.string().min(1).max(30),
  default_open: z.number(),
  created_on: z.date(),
  modified_on: z.date(),
  created_by: z.number(),
  modified_by: z.number(),
  menu_order: z.number(),
});

/**
 * used for storing sub status master
 */
export const enquirySubStatusMaster = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(50, "Field must contain at most 50 character(s)"),
  enquiry_status_id: z.number().optional(),
  status: z.string().min(1).max(30),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  stamp: z.number().optional(),
});

/**
 * used for storing simple name master
 */

export const nameMasterData = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Field must contain at least 1 character(s)")
    .max(45, "Field must contain at most 45 character(s)"),
  stamp: z.number().optional(),
});

// export const nameMasterData = z.object({
//   id: z.number().optional(),
//   name: z.string().min(1).max(45),
//   // stamp: z.number().optional(),
//   // created_by:z.string().optional(),
//   // modified_by: z.string().optional(),
//   // created_on: z.date().optional(),
//   // modified_on: z.date().optional(),
// });

/**
 * used for storing name, alias master
 */
export const nameAliasData = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(45),
  alias: z.string().max(45),
});

// export const enquirySupportConfig = z.object({
//   enquiryReqd: z.boolean().optional(),
//   supportReqd: z.boolean().optional(),

//   enquiryCloseCall: z.boolean().optional(),
//   enquiryMaintainProducts: z.boolean().optional(),
//   enquirySaveFAQ: z.boolean().optional(),
//   enquiryMaintainAction: z.boolean().optional(),

//   supportCloseCall: z.boolean().optional(),
//   supportMaintainProducts: z.boolean().optional(),
//   supportSaveFAQ: z.boolean().optional(),
//   supportMaintainAction: z.boolean().optional(),
//   supportMaintainContract: z.boolean().optional(),

//   generalMaintainArea: z.boolean().optional(),
//   generalMaintainImage: z.boolean().optional(),
//   generalShowList: z.boolean().optional(),
// });

export const voucherSchema = z.object({
  voucherNumber : z.boolean(),
  prefix : z.string().max(10,"Field should not be greater than 10 character").optional(),
  suffix : z.string().max(10,"Field should not be greater than 10 character").optional(),
  length : z.string().refine((val) => Number(val) < Number("10"), {
    message: "Field length should not be greater than 10"
  }).optional(),
  prefillWithZero : z.boolean()
})

export const enquiryConfigSchema = z.object({
  reqd : z.boolean(),
  closeCall : z.boolean(),
  maintainProducts : z.boolean(),
  saveFAQ: z.boolean(),
  allowReallocation: z.boolean(),
  maintainAction : z.boolean(),
  voucher : voucherSchema.optional()
})

export const supportConfigSchema = z.object({
  reqd : z.boolean(),
  closeCall : z.boolean(),
  maintainProducts : z.boolean(),
  saveFAQ : z.boolean(),
  allowReallocation: z.boolean(),
  maintainAction : z.boolean(),
  voucher : voucherSchema.optional()
})

export const contractConfigSchema = z.object({
  reqd : z.boolean(),
  voucher : voucherSchema.optional()
})

export const regionalSettingSchema = z.object({
  reqd : z.boolean().optional(),
  id: z.number().optional(),
  country_id: z.number(),
  state_id: z.number(),
  country: z.string().min(1,"Required"),
  state: z.string().optional(),
  decimalPlaces: z.string(),
  timeFormat: z.string().min(1,"Required"),
  currencyString: z.string().max(20,"Currency string should not be greater than 20 character").optional(),
  currencySymbol: z.string().max(2,"Currency symbol should not be greater than 2 character").optional(),
  currencySubString: z.string().max(5,"Currency sub string should not be greater than 5 character").optional(),
  dateFormat: z.string().min(1,"Required"),
  voucher : voucherSchema.optional()
});

export const searchNavbarConfigSchema = z.object({
  reqd : z.boolean(),
  menu : z.boolean(),
  enquiryDescription : z.boolean(),
  organisation : z.boolean(),
  supportDescription : z.boolean(),
  contractDescription : z.boolean(),
  product : z.boolean(),
  voucher : voucherSchema.optional()
})

export const searchContactConfigSchema = z.object({
  reqd : z.boolean(),
  name : z.boolean(),
  alias : z.boolean(),
  organisation : z.boolean(),
  phone : z.boolean(),
  email : z.boolean(),
  city : z.boolean(),
  voucher : voucherSchema.optional()
})

export const searchExecutiveConfigSchema = z.object({
  reqd : z.boolean(),
  name : z.boolean(),
  alias : z.boolean(),
  dept: z.boolean(),
  phone : z.boolean(),
  email : z.boolean(),
  role : z.boolean(),
  voucher : voucherSchema.optional()
})

export const searchOrganisationConfigSchema = z.object({
  reqd : z.boolean(),
  name : z.boolean(),
  alias : z.boolean(),
  city: z.boolean(),
  voucher : voucherSchema.optional()
})

export const configSchema = z.object({
  enquiry : enquiryConfigSchema,
  support : supportConfigSchema,
  contract : contractConfigSchema,
  regionalSetting : regionalSettingSchema,
  searchNavbar : searchNavbarConfigSchema,
  searchContact : searchContactConfigSchema,
  searchExecutive : searchExecutiveConfigSchema,
  searchOrganisation : searchOrganisationConfigSchema
})

export const companySchema = z.object({
  id: z.number().optional(),
  alias: z
    .string()
    .max(45, "Field must contain at most 45 character(s)")
    .optional(),
  name: z
    .string()
    .min(1, "Field must not be empty")
    .max(55, "Field Name must contain at most 55 character(s)"),
  add1: z
    .string()
    .max(45, "Field must contain at most 45 character(s)")
    .optional(),
  add2: z
    .string()
    .max(45, "Field must contain at most 45 character(s)")
    .optional(),
  city: z
    .string()
    .max(45, "Field must contain at most 45 character(s)")
    .optional(),
  state: z.string().optional(),
  state_id: z.number().optional(),
  country: z.string().min(1,"Required"),
  country_id: z.number().optional(),
  pincode: z
    .string()
    .max(45, "Field must contain at most 45 character(s)")
    .optional(),
  stamp: z.number().optional(),
  docData: docDescriptionSchema.optional(),
});

export const inviteUserSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Please enter Name").max(45, "Name is too long"),
    email: z
      .string()
      .regex(emailRegex, "Input must be in email format")
      .optional(),
    phone: z
      .string()
      .min(1, "Please provide phone")
      .refine((val) => checkPhone(val), {
        message: "Please provide a valid Phone No",
        path: ["phone"],
      })
      .optional(),
    contact: z.string().optional(),
    companyId: z.number(),
    status: z.number().optional(),
    inviteDate: z.date().optional(),
  })
  .refine(
    (schema) => {
      return !(schema.email === "");
    },
    { message: "Please provide email", path: ["email"] }
  );

export const configBaseSchema = z.object({
    reqd: z.boolean().optional(),
    closeCall: z.boolean().optional(),
    maintainProducts: z.boolean().optional(),
    saveFAQ: z.boolean().optional(),
    maintainAction: z.boolean().optional(),
    voucherNumber: z.boolean().optional(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
    length: z.string().optional(),
    prefillWithZero: z.boolean().optional(),
  });
  
  export const customFieldsMasterSchema = z
  .object({
    id: z.number().optional(),
    object_type_id: z.number(), // form id
    column_name_id: z.string().min(1).max(45),
    column_label: z
      .string()
      .min(1, "Please enter Label")
      .max(45, "Enter Smaller Label"),
    column_name: z.string().min(1).max(45),
    column_id: z.string().min(1).max(45),
    column_type_id: z.number(),
    column_format: z
      .string()
      .max(1000)
      .nullish(), // special handling required. blank or 1000 max
    form_section: z.string().optional().nullish(),
    is_mandatory: z.number(),
    is_default_column: z.number(),
    is_default_mandatory: z.number().nullable(),
    column_order: z.number(),
    is_disabled: z.number().optional(),
    action_id: z.number().optional(),
    default_column_label: z.string().nullish().optional(),
  })
  .refine(
    (data) => {
      const columnFormat = (data.column_format ?? "").trim(); // Trim whitespace
      if (data.column_type_id === 2 || data.column_type_id === 5) {
        // Allow trimmed alphanumeric values, optionally semicolon-separated
        const semicolonSeparatedPattern = /^([a-zA-Z0-9]+)(\s*;\s*[a-zA-Z0-9]+)*;?$/;
        return columnFormat.length > 0 && semicolonSeparatedPattern.test(columnFormat);
      }
      return true; // Allow other cases, including when column_type_id is null
    },
    {
      message: "Enter semi-colon separated options.",
      path: ["column_format"], // Point the error to column_format
    }
  )
  .transform((data) => {
    if (data.column_format) {
      // Trim and normalize column_format to remove extra spaces around semicolons
      const normalizedFormat = data.column_format
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .join(";");
      return { ...data, column_format: normalizedFormat };
    }
    return data;
  });



export const rightSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  objectName: z.string().optional(),
  objectId: z.number(),
  category: z.string().optional(),
  categoryId: z.number().optional(),
  roleId: z.number(),
  roleName: z.string().optional(),
  deptId: z.number(),
  deptName: z.string().optional(),
  createRight: z.boolean(),
  readRight: z.boolean(),
  updateRight: z.boolean(),
  deleteRight: z.boolean()
})

export const loggedInUserData = z.object({
  name: z.string(),
  userId: z.number()
});

export const configDeptMapSchema = z.object({
  enquiry : z.array(z.number()),
  support : z.array(z.number()),
  contract : z.array(z.number())
})



