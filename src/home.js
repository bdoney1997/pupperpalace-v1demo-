import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Sidebar from './sidebar';
import Upcoming from './home_upcoming';
import Current from './home_current';
import Calendar from './calendar';
import { grey } from '@mui/material/colors';

const drawerWidth = 100;
const handleChange = (event, value) => {
    console.log(value);
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function sidebar(props) {
    const { darkMode, setDarkMode } = props;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ bgcolor: 'primary', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p:3, mt: 3}}>
                <Toolbar />
                <Grid container spacing={2} justifyContent="left" alignItems="flex-start">
                    <Grid item>
                        <Item><Calendar /></Item>
                    </Grid>

                    <Grid item>
                        <Item><Current /></Item>
                    </Grid>

                    <Grid item>
                        <Item><Upcoming /></Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
