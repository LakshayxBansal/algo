import * as z from 'zod';
import * as zs from '../zodschema/zodschema';

export type userT = z.infer<typeof zs.userSchema>;

export type organisationT = z.infer<typeof zs.organisationSchema>;

export type personT = z.infer<typeof zs.personSchema>;

export type employeeT = z.infer<typeof zs.employeeSchema>;

export type inquiryT = z.infer<typeof zs.inquirySchema>;

export type optionsDataT = z.infer<typeof zs.optionsData>;

export type addEntityDlgT = z.infer<typeof zs.addEntityDlg>;

export type menuOptionT = z.infer<typeof zs.menuOption>

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
}

export type dbInfoT = {
    company_id:number,
    companyName: string,
    db_id: number,
    host: string,
    port: string,
    dbName:string
};


