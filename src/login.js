import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from 'react-router-dom'; // Import link from React Router
import Employee_inputs from './employee_inputs';

const theme = createTheme();

export default function LogIn() {
  const navigate = useNavigate();


  useEffect(() => {
    const handleLoginReply = (isAuthenticated) => {
      
      if (isAuthenticated) {
        navigate('/home');
      }
	  console.log(isAuthenticated);
    };

    ipcRenderer.on('login-reply', handleLoginReply);

    // Remove the event listener when the component unmounts
    return () => {
      ipcRenderer.removeListener('login-reply', handleLoginReply);
    };
 }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    ipcRenderer.send('login', username, password);
  };
    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
              minHeight: "100vh",
              display: 'flex',
              justifyContent: "center",
              flexDirection: 'column',
              alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
			<Button
  			type="submit"
 			fullWidth
 			variant="contained"
 			sx={{ mt: 3, mb: 2 }}
  			>

  					Log In
			</Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* New Typography component for creating an account */}
      <Typography variant="body2" sx={{ mt: 2, mb: 2}}>
              New user? Create an account.
            </Typography>
      <Employee_inputs />
      </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
