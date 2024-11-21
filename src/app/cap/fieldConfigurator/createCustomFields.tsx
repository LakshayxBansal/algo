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
    InputLabel
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


type FieldItem = {
    action_id: number;
    column_format: string | null;
    column_id: number | null;
    column_label: string;
    column_name: string;
    column_name_id: string;
    column_order: number;
    column_type_id: number;
    created_by: number | null;
    created_on: string | null;
    form_section: string | null;
    id: number;
    is_default_column: number;
    is_default_mandatory: number | null;
    is_disabled: number;
    is_mandatory: number;
    modified_by: number | null;
    modified_on: string | null;
    object_type_id: number;
}

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
    const [formError, setFormError] = useState<Record<string, { label_msg: string }>>({});


    const dateFormat = "DD.MM.YYYY";

    const options = {
        Form: [
            { label: 'Enquiry', value: 26 },
            { label: 'Contact', value: 5 },
            { label: 'Organization', value: 19 },
            { label: 'Item', value: 16 },
            { label: 'Executive', value: 11 },
            { label: 'Source', value: 2 },
            { label: 'Executive Group', value: 12 },
            { label: 'Contact Group', value: 6 },
            { label: 'Executive Department', value: 10 }
        ],
        Mode: [
            { label: 'Create', value: 1 },
            { label: 'Update', value: 2 }
        ]
    };

    const handleFormChange = (event: any) => {
        setSelectedFormValue(event.target.value);
    };

    // const handleFormModeChange = (event: any) => {
    //     setSelectedFormModeValue(event.target.value);
    // };

    useEffect(() => {
        async function getFieldData() {
            const result = await getScreenDescription(Number(selectedFormValue), 1);
            setFields(result);
        }
        getFieldData();
    }, [selectedFormValue, selectedFormModeValue]);

    let customCount = fields.filter((row: any) => row.is_default_column === 0).length + 1;
    const addField = () => {
        const newField: FieldItem = {
            action_id: 1,
            column_format: null,
            column_id: null,
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

    const handleChange = (index: number, field: keyof FieldItem, value: any) => {
        const updatedFields: any = [...fields];
        updatedFields[index][field] = value;
        updatedFields[index]["column_format"] = null;
        setFields(updatedFields);

        const updatedErrors = { ...formError };
        if (field === "column_label" && updatedFields[index].column_label.trim() !== "") {
            delete updatedErrors[updatedFields[index].column_name_id];
        }
        setFormError(updatedErrors);
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
        // Move the dragged item to the new position
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
        console.log("FIELDS", fields);
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

        // Validate each field to ensure labels are not empty
        fields.forEach((item) => {
            if (item.column_label.trim() === "") {
                errors[item.column_name_id] = { label_msg: "Label cannot be empty" };
            }
        });

        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            console.log("Validation errors:", errors);
            return; // Prevent form submission if there are errors
        }

        // Proceed with form submission if there are no errors
        try {
            const result = await createCustomFields(Number(selectedFormValue), 1, fields);
            if (result) {
                console.log("FIELDS", fields);
                alert("Field configuration saved!");
            }
            else {
                console.error("Error saving configuration:");
                alert("Failed to save configuration. Please try again.");
            }
        } catch (error) {
            console.error("Error saving configuration:", error);
            alert("Failed to save configuration. Please try again.");
        }

        // alert("Field configuration saved!");
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
                                {item.is_default_column == 0 ?
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
                                error={!!formError[item.column_name_id]} // Show error state if there's an error       
                                helperText={formError[item.column_name_id]?.label_msg} // Display error message if it exists      
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
                                <TextField
                                    label={item.column_type_id !== 4 ? "Format" : dateFormat}
                                    value={item.column_format || ""}
                                    onChange={(e) => handleChange(index, "column_format", e.target.value)}
                                    size="small"
                                    sx={{ width: 300 }}
                                    disabled={item.column_type_id !== 1 && item.column_type_id !== 3 && item.column_type_id !== 4 ? false : true}
                                    placeholder={item.column_type_id === 6
                                        ? "Number of decimal places"
                                        : item.column_type_id === 5
                                            ? "Enter comma separated list items"
                                            : item.column_type_id === 2 ? "Enter comma seperated options" : ""}
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

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={item.is_disabled === 1}
                                        onChange={(e) => handleChange(index, "is_disabled", e.target.checked ? 1 : 0)}
                                    />
                                }
                                label="Disabled"
                            />

                            {item.is_default_column !== 1 && <Box sx={{ marginLeft: "auto" }}>
                                <IconButton onClick={() => {
                                    const newFields = [...fields];
                                    newFields.splice(index, 1);
                                    setFields(newFields);
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
        </Box>
    );
};

export default FieldConfigurator;