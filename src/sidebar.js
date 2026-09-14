import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppointmentIcon from '@mui/icons-material/CalendarMonthRounded';
import CustomerIcon from '@mui/icons-material/PeopleOutlineRounded';
import PetIcon from '@mui/icons-material/PetsRounded';
import NotesIcon from '@mui/icons-material/NotesRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'; // Import link from React Router
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook
//import { getTheme } from './theme'; // Import getTheme
import logo from './images/PupperPalace_232F3E.png';


const drawerWidth = 100;

export default function Sidebar() {
  const theme = useTheme(); // Access the theme

  return (
    <Drawer
      sx={{
        open:true,
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor:theme.palette.primary.main,
          },
          'MuiSvgIcon' : {
            fontSize:"large",
          },
        }}
        variant="permanent"
        anchor="left"
    >
      <List sx={{color:theme.palette.primary.main}}>
        {/* Logo Image ListItem */}
        <ListItem style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="Logo"
            style={{ 
              maxHeight: '100%', // Limit the height to the parent container
              maxWidth: '100%', // Limit the width to the parent container
              width: '60px',  // Maintain aspect ratio
              height: 'auto',  // Maintain aspect ratio
              //marginTop: '0px',
            }}
          />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component = {Link} to = "/home"
                          sx = {{ transition: 'background-color 0.3s ease-in-out',
                                  '&:hover': {
                                  bgcolor: theme.palette.primary.light,
                                  },
                               }}
          >
            <ListItemIcon style={{ paddingLeft: '20px' }}>
             <HomeIcon sx={{ color:theme.palette.primary.contrastText,}}/>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      

        <ListItem disablePadding>
          <ListItemButton component = {Link} to = "/appointment"
                          sx = {{ transition: 'background-color 0.3s ease-in-out',
                                  '&:hover': {
                                  bgcolor: theme.palette.primary.light,
                                  },
                               }}
          >
            <ListItemIcon style={{ paddingLeft: '20px' }}>
              <AppointmentIcon sx={{color:theme.palette.primary.contrastText}} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding >
          <ListItemButton component = {Link} to = "/customer"
                          sx = {{ transition: 'background-color 0.3s ease-in-out',
                                  '&:hover': {
                                  bgcolor: theme.palette.primary.light,
                                  },
                               }}
          >
            <ListItemIcon style={{ paddingLeft: '20px' }}>
              <CustomerIcon sx={{color:theme.palette.primary.contrastText}} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding >
          <ListItemButton component = {Link} to = "/pet"
                          sx = {{ transition: 'background-color 0.3s ease-in-out',
                                  '&:hover': {
                                  bgcolor: theme.palette.primary.light,
                                  },
                               }}
          >
            <ListItemIcon style={{ paddingLeft: '20px' }}>
              <PetIcon sx={{color:theme.palette.primary.contrastText}} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding >
          <ListItemButton component = {Link} to = "/settings"
                          sx = {{ transition: 'background-color 0.3s ease-in-out',
                                  '&:hover': {
                                  bgcolor: theme.palette.primary.light,
                                  },
                               }}
          >
            <ListItemIcon style={{ paddingLeft: '20px' }}>
              <SettingsIcon sx={{color:theme.palette.primary.contrastText}} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component = {Link} to = "/logout"
                          sx = {{ transition: 'background-color 0.3s ease-in-out',
                                  '&:hover': {
                                  bgcolor: theme.palette.primary.light,
                                  },
                               }}
          >
            <ListItemIcon style={{ paddingLeft: '20px' }}>
              <LogoutRoundedIcon sx={{color:theme.palette.primary.contrastText}} />
              </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      </Drawer>
  );
}
