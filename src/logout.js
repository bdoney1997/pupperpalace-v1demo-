import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from './sidebar';
import Upcoming from './home_upcoming';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'; // Added Paper for the container
import { useNavigate, Link } from 'react-router-dom'; // Import Link from React Router
import theme from './theme';

// const red = theme.palette.warningRed.main;

function Logout({ employeeName }) {
  const navigate = useNavigate();

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1); // Navigate back
  };

  // Function to handle the logout
  const handleLogout = () => {

  console.log('Logging out');

  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'primary'
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: 'secondary.main', width: '430px' }}>
        <Toolbar>
          <Typography variant="h6">Current Time: {currentTime.toLocaleTimeString()}</Typography>
        </Toolbar>
      </AppBar>

      <Paper
          elevation={3}
        sx={{
          padding: '1rem',
          border: '1px solid #ccc',
          marginBottom: '1rem',
          width: '400px', 
          margin: '0 auto', // Center the container horizontally
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">
          Are you sure you want to log out?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <Button
            variant="contained"
            sx = {{ bgcolor: "secondary.main",
                    color: 'secondary.contrastText',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                    bgcolor: 'secondary.extraDark',
                    }, 
                 }}
            size="large"
            onClick={goBack}
            style={{ margin: '1rem' }}
          >
            Go Back
          </Button>

          <Link to="/login"> {/* Use Link component to navigate to "/login" */}
            <Button
              variant="contained"
              sx = {{ bgcolor: "primary.accent",
                      color: 'primary.contrastText',
                      transition: 'background-color 0.3s ease-in-out',
                      '&:hover': {
                      bgcolor: 'primary.extraDark',
                      }, 
                   }}
              size="large"
              onClick={handleLogout}
              style={{ margin: '1rem' }}
            >
              LOG OUT
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Logout;

