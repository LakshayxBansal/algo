"use client"

import React, { useState } from "react";
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
    Stack
} from "@mui/material";
import {
    DragHandle as DragHandleIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon
} from "@mui/icons-material";

const initialFields = [
    { id: "1", label: "Name", type: "text", mandatory: true, disabled: false },
    { id: "2", label: "Alias", type: "text", mandatory: false, disabled: false },
    { id: "3", label: "Phone", type: "numeric", mandatory: true, disabled: false },
];

const FieldConfigurator = () => {
    const [fields, setFields] = useState(initialFields);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);

    const addField = () => {
        const newField = {
            id: Date.now().toString(),
            label: "",
            type: "text",
            mandatory: false,
            disabled: false,
        };
        setFields([...fields, newField]);
    };

    const handleChange = (index: number, field: keyof typeof fields[0], value: any) => {
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
        const [movedItem] = newFields.splice(fromIndex, 1);
        newFields.splice(toIndex, 0, movedItem);
        setFields(newFields);
    };

    const handleSubmit = () => {
        console.log("Final field order and properties:", fields);
        alert("Field configuration saved!");
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: "auto", p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Configure Form Fields
            </Typography>

            <Stack spacing={1}>
                {fields.map((field, index) => (
                    <Paper
                        key={field.id}
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
                                bgcolor: "action.hover",
                            },
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
                                value={field.label}
                                onChange={(e) => handleChange(index, "label", e.target.value)}
                                size="small"
                                sx={{ width: 200 }}
                            />

                            <Select
                                value={field.type}
                                onChange={(e) => handleChange(index, "type", e.target.value)}
                                size="small"
                                sx={{ width: 120 }}
                            >
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="numeric">Numeric</MenuItem>
                                <MenuItem value="date">Date</MenuItem>
                                <MenuItem value="date">Currency</MenuItem>
                                <MenuItem value="date">List</MenuItem>                                <MenuItem value="date">Date</MenuItem>
                                <MenuItem value="date">Options</MenuItem>
                            </Select>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={field.mandatory}
                                        onChange={(e) => handleChange(index, "mandatory", e.target.checked)}
                                    />
                                }
                                label="Mandatory"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={field.disabled}
                                        onChange={(e) => handleChange(index, "disabled", e.target.checked)}
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