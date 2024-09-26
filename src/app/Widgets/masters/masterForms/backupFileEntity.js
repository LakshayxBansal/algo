import React, { useState } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const ColumnVisibilityToggle = ({ initialColumns1, initialColumns2 }) => {
    // State to manage columns1 and columns2
    const [columns1, setColumns1] = useState(initialColumns1);
    const [columns2, setColumns2] = useState(initialColumns2);

    // Create a Set of fields from columns1 for quick lookup
    const column1Fields = new Set(columns1.map(col => col.field));

    // Handle checkbox change
    const handleColumnVisibilityChange = (col) => {
        if (!column1Fields.has(col.field)) {
            // Add the column from columns2 to columns1
            setColumns1(prev => [...prev, col]);
        }
    };

    return (
        <div>
            {columns2.map((col) => (
                <FormControlLabel
                    key={col.field}
                    control={
                        <Checkbox
                            checked={column1Fields.has(col.field)} // Check if the field is present in columns1
                            onChange={() => handleColumnVisibilityChange(col)}
                        />
                    }
                    label={col.headerName}
                />
            ))}
        </div>
    );
};

// Example usage
const initialColumns1 = [
    { field: 'name' },
    { field: 'age' }
];

const initialColumns2 = [
    { field: 'name', headerName: 'Name' },
    { field: 'gender', headerName: 'Gender' },
    { field: 'address', headerName: 'Address' }
];

export default function App() {
    return (
        <ColumnVisibilityToggle
            initialColumns1={initialColumns1}
            initialColumns2={initialColumns2}
        />
    );
}
