"use client"

import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
    Stack,
    FormControl,
    InputLabel,
    Snackbar,
    Collapse,
    Alert
} from "@mui/material";
import {
    DragHandle as DragHandleIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    Label
} from "@mui/icons-material";
import { getScreenDescription } from "@/app/controllers/object.controller";
import { createCustomFields } from "@/app/controllers/customField.controller";
import CloseIcon from "@mui/icons-material/Close";
import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { customFieldsMasterSchemaT } from "@/app/models/models";


type FieldItem = customFieldsMasterSchemaT & {
    modified_by: number | null;
    modified_on: string | null;
    created_by: number | null;
    created_on: string | null;
    column_order: number;
}

// Define the type for formError
type FormError = {
    [key: string]: string; // Keys are strings, and values are error messages (strings)
};

// Define the type for each column's value
type ColumnError = {
    formError: FormError;
};

// Define the overall state type
type ErrorState = {
    [columnName: string]: ColumnError; // Column names are keys
};


const options = {
    Form: [
        { label: 'Enquiry', value: 26 },
        { label: 'Contact', value: 5 },
        { label: 'Organisation', value: 19 },
        { label: 'Executive', value: 11 },
        { label: 'Executive Department', value: 10 },
        { label: 'Support', value: 28 },
        // { label: 'Source', value: 2 },
        // { label: 'Executive Group', value: 12 },
        // { label: 'Contact Group', value: 6 },
    ],
    Mode: [
        { label: 'Create', value: 1 },
        { label: 'Update', value: 2 }
    ],
    ListOption: [
        { label: 'List of Executives', value: "executive.name" },
        { label: 'List of Contacts', value: "contact.name" }
    ],
    ColumnType: [
        { label: 'Text', value: 1 },
        { label: 'Options', value: 2 },
        { label: 'Numeric', value: 3 },
        { label: 'Date', value: 4 },
        { label: 'List', value: 5 },
        // { label: 'Currency', value: 6 },
        { label: 'Master List', value: 7 },
    ]
};

const FieldConfigurator = () => {
    const [fields, setFields] = useState<FieldItem[]>([]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [selectedFormValue, setSelectedFormValue] = useState("");
    const [selectedFormModeValue, setSelectedFormModeValue] = useState("");
    const [autoScrolling, setAutoScrolling] = useState(false);
    const scrollIntervalRef = useRef<number | null>(null);
    const [fieldHelperState, setFieldHelperState] = useState<ErrorState>({});
    const [snackOpen, setSnackOpen] = React.useState(false);
    // const [fieldelperText, setFieldHelperText] = useState<Record<string, Record<string, { label: string; format: string }>>>({});
    const dragPositionRef = useRef<number | null>(null);


    const handleFormChange = (event: any) => {
        setSelectedFormValue(event.target.value);
        setFieldHelperState({});
    };

    // const handleFormModeChange = (event: any) => {
    //     setSelectedFormModeValue(event.target.value);
    // };

    const clearFormError = () => {
        setFieldHelperState((curr) => {
            const { form, ...rest } = curr;
            return rest;
        });
    };

    useEffect(() => {
        async function getFieldData() {
            const result = await getScreenDescription(Number(selectedFormValue));
            setFields(result);
        }
        getFieldData();
    }, [selectedFormValue, selectedFormModeValue]);

    let customColumnCount = fields.filter((row: any) => row.is_default_column === 0).length;
    let counter = customColumnCount + 1;
    const addField = () => {
        const newField: FieldItem = {
            action_id: 1,
            column_format: null,
            column_id: `c_col${counter}`,
            column_label: "Label",
            column_name: `c_col${counter}`,
            column_name_id: `c_col${counter}`,
            column_order: fields.length + 1,
            column_type_id: 1,
            created_by: null,
            created_on: null,
            form_section: null,
            id: fields.length + 1,
            is_default_column: 0,
            is_default_mandatory: null,
            is_disabled: 0,
            is_mandatory: 0,
            modified_by: null,
            modified_on: null,
            object_type_id: parseInt(selectedFormValue),
            default_column_label: null
        };
        setFields([...fields, newField]);
        customColumnCount++;
    };

    // Function to update the state
    const updateErrorState = (
        columnName: string, // Column name as a string
        field: string,      // Field name as a string
        errorMessage: string // Error message as a string
    ): void => {
        setFieldHelperState((prevState) => ({
            ...prevState,
            [columnName]: {
                formError: {
                    ...prevState[columnName]?.formError, // Preserve existing errors for this column
                    [field]: errorMessage, // Add or update the error for the specified field
                },
            },
        }));
    };

    const handleChange = (index: number, field: keyof FieldItem, value: any) => {

        // setFieldHelperState((prev) => {
        //     const updatedFormError = { ...prev };
        //     if (updatedFormError['form']) {
        //         delete updatedFormError['form']; // Remove the 'form' property
        //     }
        //     return updatedFormError
        // })
        clearFormError();

        const updatedFields: any = [...fields];
        updatedFields[index][field] = value;

        if (field === "is_mandatory") {
            updatedFields[index]["is_disabled"] = 0;
        }
        setFields(updatedFields);

        if (field === "column_label" || field === "column_format") {
            setFieldHelperState((prevState) => {
                const updatedState = { ...prevState };
                const columnNameId = updatedFields[index].column_name_id;

                // Remove the error if the field is corrected
                if (value.trim() !== "") {
                    if (updatedState[columnNameId]?.formError?.[field]) {
                        delete updatedState[columnNameId].formError[field];
                    }

                    // If there are no errors left for this column, delete the entire column key
                    if (
                        updatedState[columnNameId]?.formError &&
                        Object.keys(updatedState[columnNameId].formError).length === 0
                    ) {
                        delete updatedState[columnNameId];
                    }
                }

                return updatedState;
            });
        }
    };


    const startAutoScroll = (clientY: number) => {
        const scrollThreshold = 150;
        const maxScrollSpeed = 15;
        dragPositionRef.current = clientY;

        const handleScroll = () => {
            if (!dragPositionRef.current) return;

            const viewportHeight = window.innerHeight;
            const mouseY = dragPositionRef.current;
            const distanceFromTop = mouseY;
            const distanceFromBottom = viewportHeight - mouseY;

            let scrollSpeed = 0;
            if (distanceFromTop < scrollThreshold) {
                // Scroll up when near top
                const scrollPercent = 1 - (distanceFromTop / scrollThreshold);
                scrollSpeed = -maxScrollSpeed * scrollPercent;
            } else if (distanceFromBottom < scrollThreshold) {
                // Scroll down when near bottom
                const scrollPercent = 1 - (distanceFromBottom / scrollThreshold);
                scrollSpeed = maxScrollSpeed * scrollPercent;
            }

            if (scrollSpeed !== 0) {
                window.scrollBy(0, scrollSpeed);
            }
        };

        if (!scrollIntervalRef.current) {
            scrollIntervalRef.current = window.setInterval(handleScroll, 16);
        }
    };

    const stopAutoScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
        dragPositionRef.current = null;
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedItem(index);
        const element = e.currentTarget as HTMLDivElement;
        element.style.opacity = "0.4";
        startAutoScroll(e.clientY);
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.clientY !== 0) { // Avoid processing invalid coordinates
            dragPositionRef.current = e.clientY;
        }
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const element = e.currentTarget as HTMLDivElement;
        // element.classList.remove("opacity-50");
        element.style.opacity = "1"; // Make it completely transparent
        setDraggedItem(null);
        stopAutoScroll();
    };

    // Add cleanup in useEffect
    useEffect(() => {
        return () => {
            stopAutoScroll();
        };
    }, []);


    const handleDrop = (e: React.DragEvent, toIndex: number) => {
        e.preventDefault();
        if (draggedItem === null || draggedItem === toIndex) return;

        const updatedFields = [...fields];
        // Move the dragged item to the new position ${value}`
        const [movedItem] = updatedFields.splice(draggedItem, 1);
        updatedFields.splice(toIndex, 0, movedItem);

        setFields(updatedFields);
        setDraggedItem(null);
        stopAutoScroll();
    };


    const moveItem = (fromIndex: number, direction: "up" | "down") => {
        if (
            (direction === "up" && fromIndex === 0) ||
            (direction === "down" && fromIndex === fields.length - 1)
        ) {
            return;
        }

        const newFields = [...fields];
        const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
        [newFields[fromIndex], newFields[toIndex]] = [newFields[toIndex], newFields[fromIndex]];
        setFields(newFields);
    };

    const handleSubmit = async () => {

        const grouped = fields.reduce<Record<string, string[]>>((acc, item: FieldItem) => {
            if (!acc[item.column_label]) {
                acc[item.column_label] = [];
            }
            acc[item.column_label].push(item.column_name);
            return acc;
        }, {});

        const duplicates = Object.entries(grouped)
            .filter(([label, values]) => values.length > 1)
            .map(([label, values]) => ({ label, values }));

        if (duplicates.length > 0) {
            updateErrorState("form", "column_label", "Labels Cannot be Same")
            return;
        }


        // Proceed with form submission if there are no errors
        try {
            const result = await createCustomFields(Number(selectedFormValue), fields);
            console.log("result", result.data[0].errorMessages);
            if (result.status) {
                setSnackOpen(true);
            }
            else {
                result.data.forEach((item: any) => {
                    console.log("result", item);
                    for (const [key, value] of Object.entries(item.errorMessages)) {
                        updateErrorState(item.path, `${key}`, `${value}`)
                    }
                });
            }
        } catch (error) {
            // console.error("Error saving configuration:", error);
            alert("Failed to save configuration. Please try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: "auto", p: 3 }}>
            <Collapse in={fieldHelperState?.form ? true : false}>
                <Alert
                    sx={{
                        position: "fixed", // Makes it stay on top of the screen
                        top: 75, // Positions it at the top
                        left: 40,
                        right: 30,
                        zIndex: 9999, // Ensures it's above other content
                        display: "flex",
                        justifyContent: "center", // Centers the alert horizontally
                        p: 2,
                        mb: 2
                    }}
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={clearFormError}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                // sx={{ mb: 2 }}
                >
                    {fieldHelperState?.form?.formError.column_label}
                </Alert>
            </Collapse>
            <Typography variant="h6" gutterBottom>
                Configure Form Fields :
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <FormControl sx={{ width: 200 }} size="small" variant="outlined">
                        <InputLabel>Select the Form</InputLabel>
                        <Select
                            value={selectedFormValue}
                            onChange={handleFormChange}
                            label="Select the Form"
                        >
                            {options.Form.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {fields.length > 0 && <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                    * denotes default fields
                </Typography>}
            </Box>

            {fields.length === 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "60vh", // Adjust the top position so that it starts below the dropdowns
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1,
                        flexDirection: "column",
                    }}
                >
                    <ErrorOutlineIcon sx={{ fontSize: 40, color: "gray", mb: 1 }} />
                    <Typography variant="h6" color="textSecondary">
                        No field found
                    </Typography>
                </Box>
            )}
            <Stack spacing={1}>
                {fields.map((item, index) => (
                    <Paper
                        key={item.id}
                        elevation={1}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        // onDragOver={handleDragOver}
                        onDragOver={(e) => {
                            e.preventDefault();
                            // Update scroll position during dragover
                            if (e.clientY !== 0) {
                                dragPositionRef.current = e.clientY;
                            }
                        }}
                        onDrop={(e) => handleDrop(e, index)} // Attach the handleDrop function
                        sx={{
                            p: 2,
                            cursor: "move",
                            "&:hover": {
                                bgcolor: "action.hover"
                            },
                            transition: "transform 0.2s, opacity 0.2s",
                            ...(draggedItem === index && {
                                opacity: 0.5,
                                transform: "scale(1.02)"
                            })
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <DragHandleIcon color="action" />
                                <Stack direction="column">
                                    <IconButton
                                        size="small"
                                        onClick={() => moveItem(index, "up")}
                                        disabled={index === 0}
                                    >
                                        <ArrowUpwardIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => moveItem(index, "down")}
                                        disabled={index === fields.length - 1}
                                    >
                                        <ArrowDownwardIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                                {item.is_default_column == 1 ?
                                    <Box>
                                        <Typography variant="h5" >
                                            *
                                        </Typography>
                                    </Box> :
                                    <Box>

                                    </Box>
                                }
                            </Box>
                            <InputControl
                                inputType={InputType.TEXT}
                                id="label"
                                key="label"
                                label={"Label" + `  ${item.default_column_label ? "(" + item.default_column_label + ")" : ""}`}
                                name="label"
                                error={!!fieldHelperState[item.column_name_id]?.formError.column_label} // Show error state if there's an error       
                                helperText={fieldHelperState[item.column_name_id]?.formError?.column_label} // Display error message if it exists      
                                setFormError={setFieldHelperState}
                                defaultValue={item.column_label}
                                onChange={(e: any) => handleChange(index, "column_label", e.target.value)}
                            />

                            {item.is_default_column !== 1 && (
                                <FormControl size="small" sx={{ width: 140 }}>
                                    <InputLabel>Column Type</InputLabel>
                                    <Select
                                        value={item.column_type_id}
                                        label="Column Type"
                                        onChange={(e) => {
                                            handleChange(index, "column_type_id", e.target.value)
                                            const updatedFields: FieldItem[] = [...fields];
                                            updatedFields[index]["column_format"] = null;
                                        }}
                                    >
                                        {options.ColumnType.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}

                            {item.is_default_column !== 1 && (item.column_type_id === 2 || item.column_type_id === 5) && (
                                <InputControl
                                    inputType={InputType.TEXT}
                                    id="format"
                                    key="format"
                                    label="Format"
                                    value={item.column_format || ""}
                                    error={!!fieldHelperState[item.column_name_id]?.formError.column_format} // Show error state if there's an error       
                                    helperText={fieldHelperState[item.column_name_id]?.formError?.column_format} // Display error message if it exists      
                                    name="format"
                                    sx={{
                                        width: "280px",
                                    }}
                                    defaultValue={item.column_format}
                                    onChange={(e: any) => handleChange(index, "column_format", e.target.value)}
                                    disabled={
                                        item.column_type_id !== 2 && // Text
                                        item.column_type_id !== 5 && // Numeric
                                        item.column_type_id !== 6    // Date
                                    }
                                    placeholder={item.column_type_id === 2 ? "Enter semi-colon seperated options" : "Enter semi-colon seperated List Items"}
                                />
                            )}

                            {item.column_type_id === 7 &&
                                <FormControl sx={{ width: 215 }} size="small" variant="outlined">
                                    <InputLabel>Select the Master Form</InputLabel>
                                    <Select
                                        value={item.column_format}
                                        label="Select the Master Form"
                                        onChange={(e) => {
                                            handleChange(index, "column_format", e.target.value)
                                        }}
                                    >
                                        {options.ListOption.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }

                            {item.column_type_id !== 2 && <FormControlLabel
                                disabled={item.is_default_mandatory === 1}
                                control={
                                    <Checkbox
                                        checked={item.is_mandatory === 1}
                                        onChange={(e) => handleChange(index, "is_mandatory", e.target.checked ? 1 : 0)}
                                    />
                                }
                                label="Mandatory"
                            />}
                            {item.is_default_column ? (<FormControlLabel
                                disabled={item.is_default_mandatory === 1 || item.is_mandatory === 1}
                                control={
                                    <Checkbox
                                        checked={item.is_disabled === 1}
                                        onChange={(e) => handleChange(index, "is_disabled", e.target.checked ? 1 : 0)}
                                    />
                                }
                                label="Disabled"
                            />) : (<></>)}

                            {item.is_default_column !== 1 && <Box sx={{ marginLeft: "auto" }}>
                                <IconButton onClick={() => {
                                    const newFields = [...fields];
                                    const removedField = newFields.splice(index, 1);
                                    setFields(newFields);
                                    setFieldHelperState((prevState) => {
                                        const updatedState = { ...prevState };
                                        delete updatedState[removedField[0].column_name_id];
                                        return updatedState;
                                    });
                                }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>}
                        </Box>
                    </Paper>
                ))}
            </Stack>

            {selectedFormValue !== "" && fields.length > 0 && <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button variant="outlined" onClick={addField}>
                    Add Field
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Save Configuration
                </Button>
            </Box>}
            <Snackbar
                open={snackOpen}
                autoHideDuration={1000}
                onClose={() => setSnackOpen(false)}
                message="Record Saved!"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    );
};

export default FieldConfigurator;