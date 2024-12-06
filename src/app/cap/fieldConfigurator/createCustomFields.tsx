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
    Snackbar
} from "@mui/material";
import {
    DragHandle as DragHandleIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon
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

export interface IformData {
    userID: number;
}

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


    const dateFormat = "DD.MM.YYYY";

    const options = {
        Form: [
            { label: 'Enquiry', value: 26 },
            { label: 'Contact', value: 5 },
            { label: 'Organisation', value: 19 },
            { label: 'Executive', value: 11 },
            { label: 'Executive Department', value: 10 }
            // { label: 'Item', value: 16 },
            // { label: 'Source', value: 2 },
            // { label: 'Executive Group', value: 12 },
            // { label: 'Contact Group', value: 6 },
        ],
        Mode: [
            { label: 'Create', value: 1 },
            { label: 'Update', value: 2 }
        ]
    };

    const handleFormChange = (event: any) => {
        setSelectedFormValue(event.target.value);
        setFieldHelperState({});
    };

    // const handleFormModeChange = (event: any) => {
    //     setSelectedFormModeValue(event.target.value);
    // };

    useEffect(() => {
        async function getFieldData() {
            const result = await getScreenDescription(Number(selectedFormValue));
            setFields(result);
        }
        getFieldData();
    }, [selectedFormValue, selectedFormModeValue]);

    let customCount = fields.filter((row: any) => row.is_default_column === 0).length + 1;
    const addField = () => {
        const newField: FieldItem = {
            action_id: 1,
            column_format: null,
            column_id: `c_col${customCount}`,
            column_label: "Label",
            column_name: `c_col${customCount}`,
            column_name_id: `c_col${customCount}`,
            column_order: fields.length + 1,
            column_type_id: 1,
            created_by: null,
            created_on: null,
            form_section: null,
            id: fields.length + 1,
            is_default_column: 0,
            is_default_mandatory: null,
            is_disabled: 0,
            is_mandatory: 1,
            modified_by: null,
            modified_on: null,
            object_type_id: parseInt(selectedFormValue)
        };
        setFields([...fields, newField]);
        customCount++;
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
        const scrollThreshold = 200; // pixels from top/bottom of viewport to trigger scroll
        const maxScrollSpeed = 20; // maximum scroll speed in pixels per interval

        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            const distanceFromTop = clientY;
            const distanceFromBottom = viewportHeight - clientY;

            if (distanceFromTop < scrollThreshold) {
                // Scroll up when near top
                const speed = Math.min(maxScrollSpeed, (scrollThreshold - distanceFromTop) / 5);
                window.scrollBy(0, -speed);
            } else if (distanceFromBottom < scrollThreshold) {
                // Scroll down when near bottom
                const speed = Math.min(maxScrollSpeed, (scrollThreshold - distanceFromBottom) / 5);
                window.scrollBy(0, speed);
            }
        };

        if (scrollIntervalRef.current) return; // Prevent multiple intervals
        scrollIntervalRef.current = window.setInterval(handleScroll, 16);
    };


    const stopAutoScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
        setAutoScrolling(false);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedItem(index);
        const element = e.currentTarget as HTMLDivElement;
        // element.classList.add("opacity-50");
        element.style.opacity = "0"; // Make it completely transparent
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        startAutoScroll(e.clientY); // Pass the current mouse Y position for scrolling
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const element = e.currentTarget as HTMLDivElement;
        // element.classList.remove("opacity-50");
        element.style.opacity = "1"; // Make it completely transparent
        setDraggedItem(null);
        stopAutoScroll();
    };

    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
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
        // await createCustomFields(Number(selectedFormValue), 1, fields);
        // fields.map((Item) => {
        //     if (Item.column_label == "") {
        //         const errorState = { ...formError };
        //         errorState[Item.column_name_id] = { msg: "Label cannot be Empty" };
        //         setFormError(errorState);
        //         console.log("Final field error", errorState);
        //         return;
        //     }
        // })
        const errors: Record<string, { label_msg: string }> = {};
        // const error: Record<string, { label_msg: string }> = {};


        // Validate each field to ensure labels are not empty
        fields.forEach((item) => {
            if (item.column_label.trim() === "") {
                errors[item.column_name_id] = { label_msg: "Label cannot be empty" };
            }
        });

        // if (Object.keys(errors).length > 0) {
        //     setFormError(errors);
        //     // console.log("Validation errors:", errors);
        //     return; // Prevent form submission if there are errors
        // }

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

                    {/* <FormControl sx={{ width: 200 }} size="small" variant="outlined">
                        <InputLabel>Select Form Mode</InputLabel>
                        <Select
                            value={selectedFormModeValue}
                            onChange={handleFormModeChange}
                            label="Select Form Mode"
                        >
                            {options.Mode.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
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
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
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

                            {/* <TextField
                                label="Label"
                                value={item.column_label}
                                onChange={(e) => handleChange(index, "column_label", e.target.value)}
                                size="small"
                                sx={{ width: 200 }}
                                error={!!formError[item.column_name_id]} // Show error state if there's an error
                                helperText={formError[item.column_name_id]?.label_msg} // Display error message if it exists      
                            /> */}
                            <InputControl
                                inputType={InputType.TEXT}
                                id="label"
                                key="label"
                                label="Label"
                                name="label"
                                error={!!fieldHelperState[item.column_name_id]?.formError.column_label} // Show error state if there's an error       
                                helperText={fieldHelperState[item.column_name_id]?.formError?.column_label} // Display error message if it exists      
                                defaultValue={item.column_label}
                                onChange={(e: any) => handleChange(index, "column_label", e.target.value)}
                            />

                            {item.is_default_column !== 1 && (
                                <FormControl size="small" sx={{ width: 140 }}>
                                    <InputLabel>Column Type</InputLabel>
                                    <Select
                                        value={item.column_type_id}
                                        label="Column Type"
                                        onChange={(e) => handleChange(index, "column_type_id", e.target.value)}
                                    >
                                        <MenuItem value={1}>Text</MenuItem>
                                        <MenuItem value={3}>Numeric</MenuItem>
                                        <MenuItem value={4}>Date</MenuItem>
                                        <MenuItem value={6}>Currency</MenuItem>
                                        <MenuItem value={5}>List</MenuItem>
                                        <MenuItem value={2}>Options</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                            {item.is_default_column !== 1 && (
                                <InputControl
                                    inputType={InputType.TEXT}
                                    id="format"
                                    key="format"
                                    label={item.column_type_id !== 4 ? "Format" : dateFormat}
                                    value={item.column_format || ""}
                                    error={!!fieldHelperState[item.column_name_id]?.formError.column_format} // Show error state if there's an error       
                                    helperText={fieldHelperState[item.column_name_id]?.formError?.column_format} // Display error message if it exists      
                                    name="format"
                                    defaultValue={item.column_format}
                                    onChange={(e: any) => handleChange(index, "column_format", e.target.value)}
                                    disabled={
                                        item.column_type_id !== 2 && // Text
                                        item.column_type_id !== 5 && // Numeric
                                        item.column_type_id !== 6    // Date
                                    }
                                    placeholder={item.column_type_id === 6
                                        ? "Number of decimal places"
                                        : item.column_type_id === 5
                                            ? "Enter semi-colon separated list items"
                                            : item.column_type_id === 2 ? "Enter semi-colon seperated options" : ""}
                                />
                            )}

                            <FormControlLabel
                                disabled={item.is_default_mandatory === 1}
                                control={
                                    <Checkbox
                                        checked={item.is_mandatory === 1}
                                        onChange={(e) => handleChange(index, "is_mandatory", e.target.checked ? 1 : 0)}
                                    />
                                }
                                label="Mandatory"
                            />

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