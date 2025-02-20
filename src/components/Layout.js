import React from 'react';
import Navbar from './Navbar';
import { Box } from '@mui/material';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Box component="main">
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
