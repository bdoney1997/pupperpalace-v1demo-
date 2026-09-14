import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            light: '#485769', // light squidink color
            main: '#232F3E', // SquidInk color
            accent: '#e03524', // Red color for logout 
            extraLight: '#e34939', // Extra light red
            extraDark: '#b32a1c', // Extra dark red
            contrastText: '#ffffff', // White text color, intended to contrast with main
            contrastTextDark: '#000000', // Black text color
          },
          secondary: {
            light: '#DAE9F6', // Light blue color for zebra stripes 
            main: '#146eb4', // Blue color for table headers
            dark: '#ff9900', // Yellow color for buttons 
            accent: '#ffffff', // White color
            extraLight: '#ffb300', // Extra light yellow
            extraDark: '#0a559b', // Extra dark blue
            contrastText: '#ffffff', // White text color
            contrastTextDark: '#000000', // Black text color
          },
          // ... additional color settings for light mode
        }
      : {
          // Dark mode palette
          primary: {
            light: '#2d2d30', // Dark gray color 
            main: '#252526', //  Black primary color
            accent: '#e03524', // Red color for logout
            extraLight: '#e34939', // Extra light red
            extraDark: '#b32a1c', // Extra dark red
            contrastText: '#ffffff', // Black text color, intended to contrast with main
            contrastTextDark: '#ffffff' // Black text color
          },
          secondary: {
            light: '#3e3e42', // Light gray for zebra stripes
            main: '#0065a9', // blue secondary color 
            dark: '#0065a9', // blue color for buttons 
            accent: '#2d2d30', // dark gray color
            extraLight: '#0089e5', // Extra light blue
            extraDark: '0a559b', // Extra dark blue
            contrastText: '#ffffff', // Black text color
            contrastTextDark: '#ffffff' // Black text color
          },
          // ... additional color settings for dark mode
        }),
    // ... other common settings
  },
  // ... other theme customizations
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
