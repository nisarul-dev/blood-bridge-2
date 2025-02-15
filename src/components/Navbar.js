import React from 'react';
import { useState, useEffect } from "react";
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '@/context/AuthContext.js';

const Navbar = () => {

    const { isLoggedIn, logout } = useAuth();

    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const checkLoginStatus = () => {
    //   if (localStorage.getItem("token") !== null) {
    //     setIsLoggedIn(true);
    //   } else {
    //     setIsLoggedIn(false);
    //   }
    // };
  
    // useEffect(() => {
    //   checkLoginStatus();
    // }, []);

    const handleLogout = () => {
        localStorage.getItem("token") !== null && localStorage.removeItem("token");
    }

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Blood Bridge
                    </Link>
                </Typography>
                <Box>
                    <Button color="inherit">
                        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Home
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
                            About
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Blog
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Contact
                        </Link>
                    </Button>
                    { isLoggedIn === false ?
                        <>
                            <Button color="inherit">
                                <Link href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    Login
                                </Link>
                            </Button>
                        
                            <Button color="inherit">
                                <Link href="/signup" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    Sign Up
                                </Link>
                            </Button>
                        </>
                        :
                        <>
                            <Button color="inherit">
                                <Link href="/create-post" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    Create Post
                                </Link>
                            </Button>
                            <Button onClick={logout} color="inherit">
                                {/* <Link href="/logout" style={{ color: 'inherit', textDecoration: 'none' }}> */}
                                    Logout
                                {/* </Link> */}
                            </Button>
                        </>
                    }

                    
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

