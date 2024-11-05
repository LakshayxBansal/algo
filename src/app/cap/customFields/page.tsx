"use client"

import React, { useEffect, useState } from "react";
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
    is_default_mandatory: number;
    is_disabled: number;
    is_mandatory: number;
    modified_by: number | null;
    modified_on: string | null;
    object_type_id: number;
}

const FieldConfigurator = () => {
    const [fields, setFields] = useState<FieldItem[]>([]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);

    useEffect(() => {
        async function getFieldData() {
            const result = await getScreenDescription(11, 1);
            setFields(result);
        }
        getFieldData();
    }, []);

    let customCount = 0;
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
            is_default_mandatory: 0,
            is_disabled: 0,
            is_mandatory: 1,
            modified_by: null,
            modified_on: null,
            object_type_id: 11
        };
        setFields([...fields, newField]);
        customCount++;
    };

    const handleChange = (index: number, field: keyof FieldItem, value: any) => {
        const updatedFields: any = [...fields];
        updatedFields[index][field] = value;
        setFields(updatedFields);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedItem(index);
        const element = e.currentTarget as HTMLDivElement;
        element.classList.add("opacity-50");
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const element = e.currentTarget as HTMLDivElement;
        element.classList.remove("opacity-50");
        setDraggedItem(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();

        if (draggedItem === null) return;

        const newFields = [...fields];
        const [draggedField] = newFields.splice(draggedItem, 1);
        newFields.splice(dropIndex, 0, draggedField);

        setFields(newFields);
        setDraggedItem(null);
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
        console.log("Final field order and properties:", fields);
        await createCustomFields(11, 1, fields);
        alert("Field configuration saved!");
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: "auto", p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Configure Form Fields
            </Typography>

            <Stack spacing={1}>
                {fields.map((item, index) => (
                    <Paper
                        key={item.id}
                        elevation={1}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        sx={{
                            p: 2,
                            cursor: "move",
                            "&:hover": {
                                bgcolor: "action.hover"
                            }
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
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
                            </Box>

                            <TextField
                                label="Label"
                                value={item.column_label}
                                onChange={(e) => handleChange(index, "column_label", e.target.value)}
                                size="small"
                                sx={{ width: 200 }}
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
                                    label="Format"
                                    value={item.column_format || ""}
                                    onChange={(e) => handleChange(index, "column_format", e.target.value)}
                                    size="small"
                                    sx={{ width: 200 }}
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
                        </Stack>
                    </Paper>
                ))}
            </Stack>

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button variant="outlined" onClick={addField}>
                    Add Field
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Save Configuration
                </Button>
            </Box>
        </Box>
    );
};

export default FieldConfigurator;