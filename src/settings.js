import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Typography, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Sidebar from './sidebar';

const drawerWidth = 100;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  border: '1px solid lightgray',
}));

const VerticalSpacing = styled('div')({
  marginTop: '8px', // Adjust the vertical spacing as needed
});

export default function Settings({ setMode }) {
  const handleThemeChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ bgcolor: 'primary', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 1, mt: 3 }}>
        <Toolbar />
        <Grid container spacing={2} justifyContent="left" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography fontWeight="bold" sx={{ pl: 1 }}>Theme</Typography>
            <Button 
              onClick={handleThemeChange}
              size="small"
              variant="contained"
              sx={{ mt: 1, 
                    ml: 1, 
                    mb: 2, 
                    backgroundColor: 'secondary.dark', 
                    color: 'secondary.contrastText',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                    bgcolor: 'secondary.extraLight',
                    }, 
                 }}
            >
              Dark/Light
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ p: 1 }}>
            <Item>
              <Typography variant="h5">Account holder</Typography>
              <VerticalSpacing>
                <TextField
                  label="Account holder name"
                  fullWidth
                  variant="outlined"
                />
              </VerticalSpacing>
            </Item>
          </Grid>
          <Grid item xs={12} sx={{ p: 1 }}>
            <Item>
              <Typography variant="h5">Contact Details</Typography>
              <VerticalSpacing>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                />
              </VerticalSpacing>
              <VerticalSpacing>
                <TextField
                  label="Mobile number"
                  fullWidth
                  variant="outlined"
                />
              </VerticalSpacing>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
