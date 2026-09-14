import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Table from './appointment_table';
import Appointment_inputs from './appointment_inputs';
import Search_nav from './search_navbar';


const drawerWidth = 100;
const handleChange = (event, value) => {
    console.log(value);

};

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar
          position="fixed"
          sx={{bgcolor: '#ff1744', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Appointments
            </Typography>
          </Toolbar>
        </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor:"#3f51b5",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{bgcolor:"#002984", color:"white"}}>
          <Typography variant="h6" noWrap component="div">
            Pupper Palace
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{color:"white"}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon sx={{color:"white"}} />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon sx={{color:"white"}} />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon sx={{color:"white"}} />
              </ListItemIcon>
              <ListItemText primary="Pets" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon sx={{color:"white"}} />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon sx={{color:"white"}} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
        
      </Drawer>

    <Box component="main" sx={{ display:'block', bgcolor: 'background.default', mt:15, ml:10 , position:'relative'}}>
        <Toolbar />
        <Table />
      </Box>
      <Box sx={{ display:'inline', ml:40, mt:10.5, position:'fixed' }}>
        <Search_nav />
      </Box>
      <Box sx={{ display:'inline', ml:160, mt:12, position:'fixed' }}>
        <Appointment_inputs />
      </Box>
    </Box>
  );
}
