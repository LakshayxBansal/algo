'use client';

import React, { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Snackbar from '@mui/material/Snackbar';
import Seperator from '../../../Widgets/seperator';
import { updateEnquirySupportConfig } from '../../../controllers/enquirySupportConfig.controller';
import { enquirySupportConfig } from '../../../zodschema/zodschema';
import { enquiryConfigSchemaT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";

// interface EnquiryConfigFormProps {props: enquiryConfigSchemaT}

export default function EnquiryConfigForm(props: enquiryConfigSchemaT) {

    const [formError, setFormError] = useState<Record<string, { msg: string; error: boolean }>>({});
    const [snackOpen, setSnackOpen] = useState(false);

    const [formState, setFormState] = useState<enquiryConfigSchemaT>({
        enquiryReqd: props.enquiryReqd ?? false,
        supportReqd: props.supportReqd ?? false,

        enquiryCloseCall: props.enquiryCloseCall ?? false,
        enquiryMaintainItems: props.enquiryMaintainItems ?? false,
        enquirySaveFAQ: props.enquirySaveFAQ ?? false,
        enquiryMaintainAction: props.enquiryMaintainAction ?? false,

        supportCloseCall: props.supportCloseCall ?? false,
        supportMaintainItems: props.supportMaintainItems ?? false,
        supportSaveFAQ: props.supportSaveFAQ ?? false,
        supportMaintainAction: props.supportMaintainAction ?? false,

        generalMaintainArea: props.generalMaintainArea ?? false,
        generalMaintainImage: props.generalMaintainImage ?? false,
        generalShowList: props.generalShowList ?? false,
    });



    const handleSubmit = async (formData: FormData) => {
        let data: { [key: string]: any } = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value === 'on' ? true : value;
        }


        const parsed = enquirySupportConfig.safeParse(data);

        if (!parsed.success) {
            const errorState: Record<string, { msg: string; error: boolean }> = {};
            parsed.error.errors.forEach((issue) => {
                issue.path.forEach((path) => {
                    errorState[path] = { msg: issue.message, error: true };
                });
            });
            errorState["form"] = { msg: "Validation failed", error: true };
            setFormError(errorState);
            return;
        }


        const result = await persistEntity(data as enquiryConfigSchemaT);

        if (result.status) {
            setSnackOpen(true);
            setFormError({});
        } else {
            const issues = result.data;
            const errorState: Record<string, { msg: string; error: boolean }> = {};
            for (const issue of issues) {
                for (const path of issue.path) {
                    errorState[path] = { msg: issue.message, error: true };
                }
            }
            errorState["form"] = { msg: "Error encountered", error: true };
            setFormError(errorState);
        }
    };




    async function persistEntity(data: enquiryConfigSchemaT) {
        let result;
        result = await updateEnquirySupportConfig(data);
        return result;
    }




    const handleCancel = () => {
        // Handle cancel action if necessary
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, name: keyof enquiryConfigSchemaT) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: event.target.checked,
        }));
    };

    const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>, group: 'enquiryReqd' | 'supportReqd') => {
        const checked = event.target.checked;

        setFormState((prevState) => {
            let updatedState = { ...prevState, [group]: checked };

            if (!checked) {
                if (group === 'enquiryReqd') {
                    updatedState = {
                        ...updatedState,
                        enquiryCloseCall: false,
                        enquiryMaintainItems: false,
                        enquirySaveFAQ: false,
                        enquiryMaintainAction: false,
                    };
                } else if (group === 'supportReqd') {
                    updatedState = {
                        ...updatedState,
                        supportCloseCall: false,
                        supportMaintainItems: false,
                        supportSaveFAQ: false,
                        supportMaintainAction: false,
                    };
                }
            }

            return updatedState;
        });
    };



    return (

        <Paper>

            <Seperator>Enquiry / Support Configuration</Seperator>
            <Box sx={{ p: 3 }}>
                {formError?.form?.error && <p style={{ color: 'red' }}>{formError?.form.msg}</p>}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleSubmit(formData);
                    }}
                >

                    <Box sx={{ mt: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 3 }}>
                        <InputControl
                            inputType={InputType.CHECKBOX}
                            id="enquiryReqd"
                            name="enquiryReqd"
                            custLabel="Enquiry Management (Pre Sales)"
                            checked={formState.enquiryReqd}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleGroupChange(e, 'enquiryReqd')}
                        />
                        <InputControl
                            inputType={InputType.CHECKBOX}
                            id="supportReqd"
                            name="supportReqd"
                            custLabel="Support Management (Post Sales)"
                            checked={formState.supportReqd}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleGroupChange(e, 'supportReqd')}
                        />
                    </Box>


                    <Box sx={{ mt: 1, display: 'grid', columnGap: 3, rowGap: 1, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Box component={'fieldset'} sx={{ border: '1px solid grey', borderRadius: '4px', p: 2 }}>
                            <legend>Enquiry Management Options</legend>
                            <FormGroup>
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="enquiryCloseCall"
                                    name="enquiryCloseCall"
                                    custLabel="Can Close Call at the time of Call Receipt"
                                    checked={formState.enquiryCloseCall}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'enquiryCloseCall')}
                                    disabled={!formState.enquiryReqd}
                                />
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="enquiryMaintainItems"
                                    name="enquiryMaintainItems"
                                    custLabel="Maintain Items in Call Receipt"
                                    error={formError?.enquiryMaintainItems?.error}
                                    helperText={formError?.enquiryMaintainItems?.msg}
                                    checked={formState.enquiryMaintainItems}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'enquiryMaintainItems')}
                                    disabled={!formState.enquiryReqd}
                                />
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="enquirySaveFAQ"
                                    name="enquirySaveFAQ"
                                    custLabel="Ask to Save FAQ on Call Receipt and Report Saving"
                                    checked={formState.enquirySaveFAQ}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'enquirySaveFAQ')}
                                    disabled={!formState.enquiryReqd}
                                />
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="enquiryMaintainAction"
                                    name="enquiryMaintainAction"
                                    custLabel="Maintain Action Taken for Call Receipt"
                                    checked={formState.enquiryMaintainAction}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'enquiryMaintainAction')}
                                    disabled={!formState.enquiryReqd}
                                />
                            </FormGroup>
                        </Box>


                        <Box component={'fieldset'} sx={{ border: '1px solid grey', borderRadius: '4px', p: 2 }}>
                            <legend>Support Management Options</legend>
                            <FormGroup>
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="supportCloseCall"
                                    name="supportCloseCall"
                                    custLabel="Can Close Call at the time of Call Receipt"
                                    checked={formState.supportCloseCall}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'supportCloseCall')}
                                    disabled={!formState.supportReqd}
                                />
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="supportMaintainItems"
                                    name="supportMaintainItems"
                                    custLabel="Maintain Items in Call Receipt"
                                    checked={formState.supportMaintainItems}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'supportMaintainItems')}
                                    disabled={!formState.supportReqd}
                                />
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="supportSaveFAQ"
                                    name="supportSaveFAQ"
                                    custLabel="Ask to Save FAQ on Call Receipt and Report Saving"
                                    checked={formState.supportSaveFAQ}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'supportSaveFAQ')}
                                    disabled={!formState.supportReqd}
                                />
                                <InputControl
                                    inputType={InputType.CHECKBOX}
                                    id="supportMaintainAction"
                                    name="supportMaintainAction"
                                    custLabel="Maintain Action Taken for Call Receipt"
                                    checked={formState.supportMaintainAction}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'supportMaintainAction')}
                                    disabled={!formState.supportReqd}
                                />
                            </FormGroup>
                        </Box>

                    </Box>




                    <Box component={'fieldset'} sx={{ mt: 2, border: '1px solid grey', borderRadius: '4px', p: 2 }}>
                        <legend>General Configuration Options</legend>
                        <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 3 }}>
                            <InputControl
                                inputType={InputType.CHECKBOX}
                                id="generalMaintainArea"
                                name="generalMaintainArea"
                                custLabel="Maintain Area / Region in Call Receipt"
                                checked={formState.generalMaintainArea}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'generalMaintainArea')}
                            />
                            <InputControl
                                inputType={InputType.CHECKBOX}
                                id="generalMaintainImage"
                                name="generalMaintainImage"
                                custLabel="Maintain Image Information"
                                checked={formState.generalMaintainImage}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'generalMaintainImage')}
                            />
                            <InputControl
                                inputType={InputType.CHECKBOX}
                                id="generalShowList"
                                name="generalShowList"
                                custLabel="Show List in Call Allocation"
                                checked={formState.generalShowList}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, 'generalShowList')}
                            />
                        </FormGroup>
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, columnGap: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>


                </form>


                <Snackbar
                    open={snackOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackOpen(false)}
                    message={'Configuration saved successfully!'}
                />

            </Box>


        </Paper>

    );
}
