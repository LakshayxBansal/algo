import * as z from "zod";
import * as zs from "../zodschema/zodschema";

export type userSchemaT = z.infer<typeof zs.userSchema>;

export type organisationSchemaT = z.infer<typeof zs.organisationSchema>;

export type contactSchemaT = z.infer<typeof zs.contactSchema>;

export type itemSchemaT = z.infer<typeof zs.ItemSchema>;

export type itemGroupSchemaT = z.infer<typeof zs.itemGroupSchema>;

export type unitSchemaT = z.infer<typeof zs.UnitSchema>;
export type inviteUserSchemaT = z.infer<typeof zs.inviteUserSchema>;
export type companySchemaT = z.infer<typeof zs.companySchema>;
export type currencySchemaT = z.infer<typeof zs.currencySchema>;
export type areaSchemaT = z.infer<typeof zs.areaSchema>;

export type contactGroupSchemaT = z.infer<typeof zs.contactGroupSchema>;

export type optionsDataT = {
  id?: number;
  name: string;
  detail?: string;
};

export type addEntityDlgT = z.infer<typeof zs.addEntityDlg>;

export type countrySchemaT = z.infer<typeof zs.countrySchema>;

export type stateSchemaT = z.infer<typeof zs.stateSchema>;

export type stateListSchemaT = z.infer<typeof zs.stateListSchema>;

export type formErrorT = { msg: string; error: boolean };

export type RenderFormFunctionT = (
  fnDialogOpen: (props: any) => void,
  fnDialogValue: (props: any) => void,
  data?: any,
  parentData?: any
) => JSX.Element;


export type masterFormPropsT = {
  setDialogOpen?: (props: any) => void;
  setDialogValue?: (props: any) => void;
  data?: any;
};

export type masterFormPropsWithParentT = masterFormPropsT & {
  parentData?: number;
};

export type masterFormPropsWithExecutive = masterFormPropsT & {
  isExecutive?: boolean
}

// export type masterFormPropsWithParentT = {
//     setDialogOpen?: (props: any) => void,
//     setDialogValue?: (props: any) => void,
//     data?: any
//     parentData?: number
// }

// // Added parentData property of type number
export type masterFormPropsWithDataT = {
  setDialogOpen?: (props: any) => void;
  setDialogValue?: (props: any) => void;
  data?: any;
  parentData?: any;
};

//Enquiry Schemas
export type enquirySubStatusMasterT = z.infer<typeof zs.enquirySubStatusMaster>;
export type enquiryHeaderSchemaT = z.infer<typeof zs.enquiryHeaderSchema>;
export type enquiryLedgerSchemaT = z.infer<typeof zs.enquiryLedgerSchema>;

//jp_dev
export type deptT = z.infer<typeof zs.deptSchema>;
export type getDeptsT = [{
    id: number;
    name: string;
    rowID: number;
    stamp: number }]
    //jp mail files
    export type getDeptT = [{
        id: number;
        name: string;
        stamp: number }]
    //jp_dev

// executive schemas
export type executiveSchemaT = z.infer<typeof zs.executiveSchema>;
export type executiveRoleSchemaT = z.infer<typeof zs.executiveRoleSchema>;
export type executiveGroupSchemaT = z.infer<typeof zs.executiveGroupSchema>;
export type executiveDeptSchemaT = z.infer<typeof zs.executiveDeptSchema>;

export type nameMasterDataT = z.infer<typeof zs.nameMasterData>; // for simple name based masters
export type nameAliasDataT = z.infer<typeof zs.nameAliasData>; // for name and alias masters

export type menuOptionT = z.infer<typeof zs.menuOption>;

export type searchDataT = z.infer<typeof zs.searchData>;

export type menuTreeT = {
  id: number;
  name: string;
  short_name: string;
  parent_id: number;
  icon: string;
  href: string;
  default_open: number;
  created_on: Date;
  modified_on: Date;
  created_by: number;
  modified_by: number;
  menu_order: number;
  children: menuTreeT[];
};

export type dbInfoT = {
  id: number;
  companyName: string;
  db_id: number;
  host: string;
  port: string;
  dbName: string;
};

export type getOrgansT = [
  {
    id: string;
    name: string;
    printName: string;
    alias: string;
    rowID: number;
    stamp: string;
  }
];

export type selectKeyValueT = {
  [key: string]: any;
};

export type getContactByPageT = [
  {
    id: number;
    name: string;
    whatsapp: string;
    email: string;
  }
];

export type getItemT = [
  {
    id: number;
    name: string;
    phone: string;
    email: string;
  }
];

export type getUnitT = [
  {
    id: number;
    name: string;
    phone: string;
    email: string;
  }
];

export type enquiryConfigSchemaT = z.infer<typeof zs.enquirySupportConfig>;
