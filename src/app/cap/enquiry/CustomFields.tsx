import { InputControl, InputType } from "@/app/Widgets/input/InputControl"
import { Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useState } from "react";

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
    column_order: number
}

export default function CustomField(props: { desc: CustomFieldT }) {
    console.log(props.desc);
    const [status, setStatus] = useState(0);

    function onStatusChange(event: React.SyntheticEvent, value: any) {
        setStatus(value);
    }

    const renderField = () => {
        switch (props.desc.column_type_id) {
            case 1:
                return (
                    <InputControl
                        id={props.desc.column_name_id}
                        label={props.desc.column_label}
                        inputType={InputType.TEXT}
                        name={props.desc.column_name}
                        fullWidth
                        required={!!props.desc.is_mandatory}
                    />
                );
            case 4:
                return (
                    <InputControl
                        id={props.desc.column_name_id}
                        label={props.desc.column_label}
                        inputType={InputType.DATEINPUT}
                        name={props.desc.column_name}
                        fullWidth
                        required={props.desc.is_mandatory}
                    />
                )
            case 5:
                const list_item = props.desc.column_format?.split(",") || [];
                return (
                    <Autocomplete
                        options={list_item}
                        renderInput={(params) => (
                            <InputControl
                                {...params}
                                label={props.desc.column_label}
                                name={props.desc.column_name}
                                fullWidth
                                required={props.desc.is_mandatory === 1}
                            />
                        )}
                    />
                )
            case 2:
                const option = props.desc.column_format?.split(",") || [];
                return (
                    <FormControl>
                        <RadioGroup
                            row
                            name="option"
                            id="option"
                            onChange={onStatusChange}
                        >
                            <FormControlLabel
                                value={0}
                                control={<label />}
                                label={props.desc.column_label + " :"}
                            />
                            {option.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={index + 1}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )
        }
    }

    return <>{renderField()}</>;
}