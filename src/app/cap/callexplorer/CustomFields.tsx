import { InputControl, InputType } from "@/app/Widgets/input/InputControl"

export default function CustomField(props: {

    id: number,
    object_type_id: number,
    column_name_id: string,
    column_label: string,
    column_name: string,
    column_id: string,
    column_type_id: number,
    column_format: null,
    form_section: null,
    is_mandatory: number,
    created_by: null,
    created_on: null,
    modified_by: null,
    modified_on: null,
    is_default_column: number,
    is_default_mandatory: null,
    column_order: number

}) {
    return
    if (props.column_type_id == 1)
        <InputControl
            id={props.column_name_id}
            label={props.column_label}
            inputType={InputType.TEXT}
            name={props.column_name}
            fullWidth
            required={props.is_mandatory}
        >
        </InputControl>
    else if (props.column_type_id == 4)
        <InputControl
            id={props.column_name_id}
            label={props.column_label}
            inputType={InputType.DATEINPUT}
            name={props.column_name}
            fullWidth
            required={props.is_mandatory}
        >
        </InputControl>
}