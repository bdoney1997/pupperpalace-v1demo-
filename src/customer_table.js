import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook
import Button from '@mui/material/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//import { getTheme } from './theme'; // Import getTheme

// CSS for the hover effect
const hoverEffectStyle = {
    '.contact-info-hidden': {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
    },
    '.contact-info-hidden:hover': {
        opacity: 1,
    },
};


const columns = (iconState, setIconState, opacityState, toggleOpacity) => [
    {
        field: 'cust_id',
        headerClassName: 'customer_header',
        headerName: 'Customer ID',
        sortable: true,
        width: 120,
    },
    {
        field: 'first',
        headerClassName: 'customer_header',
        headerName: 'First Name',
        width: 120,
        editable: true,
    },
    {
        field: 'last',
        headerClassName: 'customer_header',
        headerName: 'Last Name',
        width: 120,
        editable: true,
    },
    {
        field: 'phone',
        headerClassName: 'customer_header',
        headerName: 'Phone Number',
        type: 'number',
        width: 150,
        renderCell: (params) => (
            <div style={{ opacity: opacityState }}>{params.value}</div>
        ),
        editable: true,
        align: 'left', // Align content to the left
        headerAlign: 'left', // Optional: Align header to the left
    },
    {
        field: 'pets',
        headerClassName: 'customer_header',
        headerName: 'Pets',
        width: 150,
        editable: true,
        align: 'left', // Align content to the left
        headerAlign: 'left', // Optional: Align header to the left
    }
];

export default function DataGridDemo() {
    const theme = useTheme(); // Access the Material-UI theme
    const [iconState, setIconState] = React.useState({});
    const [opacityState, setOpacityState] = useState(0); // State to track opacity

    const toggleOpacity = () => {
        setOpacityState(opacityState === 0 ? 1 : 0); // Toggle opacity between 0 and 1
    };

    const tableStyle = {
        height: 650,
        width: '100%',
        '& .customer_header': {
            backgroundColor: theme.palette.secondary.main, // Blue color for table header
            color: theme.palette.secondary.contrastText
        },
        '& .MuiDataGrid-row': {
            '&:nth-child(odd)': {
                backgroundColor: theme.palette.secondary.light, // Light blue color for odd rows
                color: theme.palette.secondary.contrastTextDark,
            },
            '&:nth-child(even)': {
                backgroundColor: theme.palette.secondary.accent, // White color for even rows
                color: theme.palette.primary.contrastTextDark,
            },
        },
    };

    const [rows, setRows] = useState([]);
    useEffect(() => {
        ipcRenderer.send('request-cust-data');

        ipcRenderer.on('cust-data-from-database', (data, event) => {
            // Handle the received pet data
            const mappedData = data.map((item, index) => ({
                id: index + 1,
                cust_id: item.customer_id,
                first: item.customer_first,
                last: item.customer_last,
                phone: item.customer_phone,
                pets: item.pets
            }));

            setRows(mappedData);
            console.log(mappedData);
        });

        // Clean up the IPC event listener when the component unmounts
        return () => {
            ipcRenderer.removeListener('cust-data-from-database');
        };
    }, []);

    return (
        <Box sx={tableStyle}>
            <DataGrid
                rows={rows}
                columns={columns(iconState, setIconState, opacityState, toggleOpacity)}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                //checkboxSelection
                disableRowSelectionOnClick
            
            />
            <div style={{ position: 'absolute', top: '-18.59px', right: '-131px' }}>
                <Button size="large"
                    startIcon={<VisibilityOffIcon />}
                    variant="contained"
                    sx={{
                        bgcolor: theme.palette.secondary.dark,
                        transition: 'background-color 0.3s ease-in-out',
                        '&:hover': {
                            bgcolor: theme.palette.secondary.extraLight,
                        },
                    }}
                    onClick={toggleOpacity}>
                    Hide Contacts
                </Button>
            </div>
        </Box>
    );
}