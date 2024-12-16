
import getMasterForTable from "@/app/controllers/masterForTable.controller";
import { optionsDataT, selectKeyValueT } from "@/app/models/models";
import AutocompleteDB from "@/app/Widgets/AutocompleteDB";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl"
import { Autocomplete, Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type CustomFieldT = {
    key: number,
    id: number,
    object_type_id: number,
    column_name_id: string,
    column_label: string,
    column_name: string,
    column_id: string,
    column_type_id: number,
    column_format: null | string,
    form_section: null,
    is_mandatory: number,
    created_by: null,
    created_on: null,
    modified_by: null,
    modified_on: null,
    is_default_column: number,
    is_default_mandatory: null,
    column_order: number,
    is_disabled: number
}

export default function CustomField(props: { desc: CustomFieldT, defaultValue?: any, setSelectValues?: (props: any) => void }) {
    console.log("props.defaultValue", props.defaultValue);
    const [status, setStatus] = useState(0);
    const [selectedMasterValue, setSelectedMasterValue] = useState<{ id: number | undefined, name: string }>({ id: props.defaultValue?.id ? props.defaultValue.id : undefined, name: props.defaultValue?.name });
    const columnType = {
        Text: 1,
        Options: 2,
        Numeric: 3,
        Date: 4,
        List: 5,
        Currency: 6,
        MasterList: 7
    }

    function handleMasterValueChange(val: any) {
        if (props.setSelectValues) {
            props.setSelectValues((prevState: selectKeyValueT) => {
                const updatedState = { ...prevState };
                updatedState[props.desc.column_name] = val;
                return updatedState;
            });
        }
        setSelectedMasterValue(val);
    }


    function onStatusChange(event: React.SyntheticEvent, value: any) {
        setStatus(value);
    }

    const renderField = () => {
        switch (props.desc.column_type_id) {
            case columnType.Text:
                return (
                    <InputControl
                        id={props.desc.column_name_id}
                        label={props.desc.column_label}
                        inputType={InputType.TEXT}
                        name={props.desc.column_name}
                        required={!!props.desc.is_mandatory}
                        defaultValue={props.defaultValue}
                        disabled={props.desc.is_disabled === 1 ? true : false}
                        fullWidth
                    />
                );
            case columnType.Numeric:
                return (
                    <InputControl
                        id={props.desc.column_name_id}
                        label={props.desc.column_label}
                        inputType={InputType.TEXT}
                        type="number"
                        name={props.desc.column_name}
                        required={!!props.desc.is_mandatory}
                        defaultValue={props.defaultValue}
                        disabled={props.desc.is_disabled === 1 ? true : false}
                        fullWidth
                    />
                );
            case columnType.Date:
                return (
                    <InputControl
                        id={props.desc.column_name_id}
                        label={props.desc.column_label}
                        inputType={InputType.DATEINPUT}
                        name={props.desc.column_name}
                        sx={{ width: "100%" }}
                        required={props.desc.is_mandatory}
                        defaultValue={props.defaultValue ? dayjs(props.defaultValue) : null}
                        disabled={props.desc.is_disabled === 1 ? true : false}
                    />
                )
            case columnType.List:
                const list_item = props.desc.column_format?.split(",") || [];
                return (
                    <Autocomplete
                        id={props.desc.column_name_id}
                        options={list_item}
                        defaultValue={props.defaultValue}
                        disabled={props.desc.is_disabled === 1 ? true : false}
                        renderInput={(params) => (
                            <InputControl
                                {...params}
                                inputType={InputType.TEXT}
                                label={props.desc.column_label}
                                name={props.desc.column_name}
                                required={props.desc.is_mandatory === 1}
                                fullWidth
                            />
                        )}
                        fullWidth
                    />
                )
            case columnType.Options:
                const option = props.desc.column_format?.split(";") || [];
                return (
                    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", ml: 3, mt: 1 }}>
                        <FormControl required={props.desc.is_mandatory === 1 ? true : false}>
                            <RadioGroup
                                row
                                name={props.desc.column_name}
                                id={props.desc.column_name_id}
                                onChange={onStatusChange}
                                defaultValue={props.defaultValue !== undefined ? props.defaultValue : 1}
                                value={status || (props.defaultValue !== undefined ? props.defaultValue : 1)}
                            >
                                <FormControlLabel
                                    control={<label />}
                                    label={props.desc.column_label + " :"}
                                />
                                <Box sx={{
                                    display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                                }}>
                                    {option.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={index + 1}
                                            control={<Radio />}
                                            label={option}
                                        />
                                    ))}
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                )
            case columnType.MasterList:
                return (
                    <AutocompleteDB
                        name={props.desc.column_name}
                        id={props.desc.column_name_id}
                        label={props.desc.column_label}
                        onChange={(e, val, s) => { handleMasterValueChange(val) }}
                        fetchDataFn={(arg: any) => getMasterForTable(props.desc.column_format, arg)}
                        defaultValue={
                            props.defaultValue
                                ? {
                                    id: props.defaultValue.id,
                                    name: props.defaultValue.name,
                                }
                                : undefined // Set default value to null if no data exists
                        }
                        diaglogVal={{
                            id: selectedMasterValue?.id,
                            name: selectedMasterValue?.name,
                            detail: undefined,
                        }}
                        setDialogVal={function (
                            value: React.SetStateAction<optionsDataT>
                        ): void {
                        }}
                        fnSetModifyMode={function (id: string): void { }}
                    />
                )
        }
    }

    return <>{renderField()}</>;
}
