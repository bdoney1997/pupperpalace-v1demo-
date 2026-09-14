import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Search_nav from './search_navbar';
import Sidebar from './sidebar'
import PetTable from './pet_table';
import Pet_inputs from './pet_inputs';
import Button from  '@mui/material/Button';

const drawerWidth = 100;
const handleChange = (event, value) => {
    console.log(value);
};
const handleManageCustomers = () =>{
    console.log("Add pet button was clicked")
};

export default function Pet() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ bgcolor: 'primary', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Pets
                    </Typography>
                    <Search_nav />
                </Toolbar>
            </AppBar>
            <Sidebar />
            <Box component="main" sx={{ display: 'block', bgcolor: 'background.default', mt: 15, ml: 10, position: 'relative' }}>
                <Toolbar />
                <PetTable />
            </Box>
            <Box sx={{ display: 'inline', ml: 105, mt: 13, position: 'fixed' }}>
                <Pet_inputs/>

            </Box>
        </Box>
    );
}
