import { InputControl, InputType } from "@/app/Widgets/input/InputControl"
import { Autocomplete, TextField } from "@mui/material"

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

export default function CustomField(props: {

    desc: CustomFieldT

}) {
    console.log(props.desc);

    const options = props.desc.column_format ? props.desc.column_format.split(",") : [];
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
            case 4: // Date input
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
            case 5: // Autocomplete
                const options = props.desc.column_format?.split(",") || [];
                return (
                    <Autocomplete
                        options={options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={props.desc.column_label}
                                name={props.desc.column_name}
                                fullWidth
                                required={props.desc.is_mandatory === 1}
                            />
                        )}
                    />
                )
        }
    }

    return <>{renderField()}</>;
}