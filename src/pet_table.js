import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import HealthButton from './pet_health_button.js';
import ImageButton from './pet_image_button.js';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook
//import { getTheme } from './theme'; // Import getTheme


const columns = [
    {
        field: 'id',
        headerClassName: 'pet_header',
        headerName: 'ID',
        width: 50
    },
    {
        field: 'pet',
        headerClassName: 'pet_header',
        headerName: 'Pet Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
    },
    {
        field: 'owner',
        headerClassName: 'pet_header',
        headerName: 'Owner Name',
        width: 200,
        editable: true,
    },
    {
        field: 'breedtype',
        headerClassName: 'pet_header',
        headerName: 'Breed Type',
        width: 100,
        editable: true,
    },
    {
        field: 'age',
        headerClassName: 'pet_header',
        headerName: 'Age',
        //type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'gender',
        headerClassName: 'pet_header',
        headerName: 'Gender',
        width: 80,
        editable: true,
    },
    {
        field: 'health_button',
        headerClassName: 'pet_header',
        headerName: 'Health Notes',
        width: 100,
        editable: false,
        sortable: false,
        renderCell: () => {
            return (
                <HealthButton>
                    health_information
                </HealthButton>
            );
        }
    },
];

export default function DataGridDemo() {
    const theme = useTheme(); // Access the Material-UI theme

    const tableStyle = {
        height: 650,
        width: '100%',
        '& .pet_header': {
            bgcolor: theme.palette.secondary.main, // blue color for header
            color: theme.palette.secondary.contrastText, // White text color 
        },
        '& .MuiDataGrid-row': {
            '&:nth-child(odd)': {
                bgcolor: theme.palette.secondary.light, // Light blue color for odd rows
                color: theme.palette.secondary.contrastTextDark, // Black text color
            },
            '&:nth-child(even)': {
                backgroundColor: theme.palette.secondary.accent, // White color for even rows
                color: theme.palette.primary.contrastTextDark, // Black text color
            },
        },
    };

    const [rows, setRows] = useState([]);
    useEffect(() => {
        ipcRenderer.send('request-pet-data');

        ipcRenderer.on('pet-data-from-database', (data, event) => {
            // Handle the received pet data
            const mappedData = data.map((item, index) => ({
                id: item.pet_id,
                pet: item.pet_name,
                owner: `${item.customer_first} ${item.customer_last}`,
                breedtype: item.pet_breed,
                age: item.age,
                gender: item.pet_sex,
                health: item.pet_health,
            }));

            setRows(mappedData);
            console.log(mappedData);
        });

        // Clean up the IPC event listener when the component unmounts
        return () => {
            ipcRenderer.removeListener('pet-data-from-database');
        };
    }, []);

    return (
        <Box sx={tableStyle}>
            <DataGrid
                rows={rows}
                columns={columns}
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
        </Box>
    );
}
