import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d32f2f', // Blood-red theme
        },
        secondary: {
            main: '#f57c00', // Accent color
        },
        background: {
            default: '#f4f6f8', // Light background
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            color: '#333333',
        },
        body2: {
            fontSize: '0.875rem',
            color: '#555555',
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
