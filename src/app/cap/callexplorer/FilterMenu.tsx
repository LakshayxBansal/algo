"use client"
import { ContainedButton, OutlinedButton } from "@/app/utils/styledComponents";
import { Box, Menu, MenuItem, Tooltip } from "@mui/material";
import { GridFilterListIcon } from "@mui/x-data-grid";
import { useState } from "react";

interface customprop {
    setFilterValueState: (props: any) => void;
    setDlgState: (props: any) => void;
    filterValueState: { [key: string]: any };
    children?: React.ReactNode;
    field: string;
    headerName: string;
    tooltipTitle: string;
    filterReset?: (props: any) => void;
    resetValue?: string;
}

export default function FilterMenu(props: customprop,) {
    type DlgState = {
        [key: string]: HTMLElement | null;
    };


    const [dlgState, setDlgState] = useState<DlgState>({});

    const handleClickFilter = (column: string) => (event: React.MouseEvent<HTMLElement>) => {
        setDlgState({
            ...dlgState,
            [column]: event.currentTarget,
        });
    };

    const handleCloseFilter = (field: string) => {
        setDlgState((prevState) => ({
            ...prevState,
            [field]: null,
        }));
    };

    const newhandleFilterReset = (field: string) => {
        props.setFilterValueState((prevState: any) => ({
            ...prevState,
            [field]: null,
        }));
        handleCloseFilter(field);
    };


    return (
        <Box>
            <OutlinedButton
                sx={{ color: props.filterValueState[props.field] ? "blue" : "black", textTransform: "none" }}
                startIcon={
                    <Tooltip title={props.tooltipTitle} arrow>
                        <GridFilterListIcon style={{ fontSize:12}} />
                    </Tooltip>
                }
                onClick={handleClickFilter(props.field)}
            >
                {props.headerName}
            </OutlinedButton>
            <Menu
                anchorEl={dlgState[props.field]}
                open={Boolean(dlgState[props.field])}
                onClose={() => handleCloseFilter(props.field)}
            >
                {props.children}
                <MenuItem>
                    <ContainedButton
                        onClick={() => handleCloseFilter(props.field)}
                        fullWidth
                        variant="contained"
                    >
                        Apply Filter
                    </ContainedButton>
                    <MenuItem>
                        <ContainedButton
                            onClick={() => {
                                newhandleFilterReset(props.field)
                                props.filterReset && props.filterReset(props.resetValue);
                            }}
                            fullWidth
                            variant="contained"
                        >
                            Reset Filter
                        </ContainedButton>
                    </MenuItem>
                </MenuItem>
            </Menu>
        </Box>
    )
}