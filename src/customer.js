import React, { useState } from 'react';
import Stripe from 'stripe'; // Import Stripe library
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Search_nav from './search_navbar';
import Sidebar from './sidebar';
import CustTable from './customer_table';
import {Link} from 'react-router-dom'; // Import link from React Router
import Customer_inputs from './customer_inputs';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook

// publishable key for Stripe payment
const stripe = Stripe('pk_test_51O4akXErlJZO72L5NqMt0BiNkmyxVPNGD4ZGAr45dI6Lz5xDqFSK8jmlVM2SZrY1dKr8MTbtry4k0y24cB9DJCec00pJEtcwD0');
const drawerWidth = 100;

const handleAddPaymentClick = async () => {

    // This will open the payment page and focus on it.
    // This payment will specifically be for the subscription-based service, which is the daily charge of $12 (subject to change)
    let newWin = window.open("https://buy.stripe.com/test_dR628I9qW6RZ2v6aEF", "Payment", "width=500,height=500");
    newWin.focus();
};

const handleManageCustomers = async () => {

    let newDash = window.open("https://dashboard.stripe.com/test/customers", "Manage", "width=500,height=500");
    newWin.focus();
}

export default function Customer() {
  const theme = useTheme(); // Access the Material-UI theme
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ bgcolor: 'primary', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Customers
            </Typography>
            <Search_nav />
          </Toolbar>
        </AppBar>
        <Sidebar />
        <Box component="main" sx={{ display: 'block', bgcolor: 'background.default', mt: 15, ml: 10, position: 'relative' }}>
          <Toolbar />
          <CustTable />
        </Box>
        <Box sx={{ display: 'flex', ml: 22.6, mt: 13, position: 'fixed' }}>

        <Customer_inputs/>
          {/* "Manage Customers" button */}
          <Button
          startIcon = {<ContactsSharpIcon />}
            variant="contained"
            //sx={{ backgroundColor: 'secondary.dark', color: 'secondary.contrastText', marginLeft: '20px' }}
            sx={{ 
              bgcolor: theme.palette.secondary.dark, 
              transition: 'background-color 0.3s ease-in-out',
              '&:hover': {
                bgcolor: theme.palette.secondary.extraLight,
              }, 
              marginLeft: '20px',
            }}
            onClick={handleManageCustomers}
          >
            Manage Customers
          </Button>
          {/* "Add Payment" button */}
          <Button
          startIcon = {<AddCardIcon />}
            variant="contained"
            //sx={{ backgroundColor: 'secondary.dark', color: 'secondary.contrastText', marginLeft: '20px' }}
            sx={{ 
              bgcolor: theme.palette.secondary.dark, 
              transition: 'background-color 0.3s ease-in-out',
              '&:hover': {
                bgcolor: theme.palette.secondary.extraLight,
              }, 
              marginLeft: '20px',
            }}
            onClick={handleAddPaymentClick}
          >
            Add Payment
          </Button>
        </Box>
      </Box>
    );
  }
