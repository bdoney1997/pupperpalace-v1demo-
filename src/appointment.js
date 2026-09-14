import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from './appointment_table';
import Appointment_inputs from './appointment_inputs';
import Search_nav from './search_navbar';
import Sidebar from './sidebar'
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook

const drawerWidth = 100;
const handleChange = (event, value) => {
    console.log(value);
};

export default function PermanentDrawerLeft() {
    const theme = useTheme(); // Access the theme

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ bgcolor: theme.palette.primary, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Appointments
                    </Typography>
                    <Search_nav />
                </Toolbar>
            </AppBar>
            <Sidebar />
            <Box component="main" sx={{ display: 'block', bgcolor: 'background.default', mt: 15, ml: 8, position: 'relative' }}>
                <Toolbar />
                <Table />
            </Box>
            <Box sx={{ display: 'inline', ml: 147.5, mt: 13, position: 'fixed' }}>
                <Appointment_inputs />
            </Box>
        </Box>
    );
}
