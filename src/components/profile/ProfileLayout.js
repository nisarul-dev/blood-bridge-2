"use client"

import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const menuItems = [
  { name: "Personal Information", icon: <PersonIcon />, path: "/profile" },
  { name: "Recent Donations", icon: <BloodtypeIcon />, path: "/profile/donations" },
  { name: "Blood Requests", icon: <RequestPageIcon />, path: "/profile/blood-requests" },
  { name: "Fund Donations", icon: <AttachMoneyIcon />, path: "/profile/funds" },
];

export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 260 }}>
      <IconButton
        onClick={toggleDrawer}
        sx={{ display: { xs: "block", md: "none" }, ml: "auto", m: 1 }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            component={NextLink}
            href={item.path}
            selected={pathname === item.path}
            sx={{
              borderRadius: 2,
              margin: 1,
              padding: 1.5,
              backgroundColor: pathname === item.path ? "primary.main" : "transparent",
              color: pathname === item.path ? "primary.contrastText" : "text.primary",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "primary.contrastText",
              },
              "&.Mui-selected": {
                backgroundColor: "primary.dark",
                color: "primary.contrastText",
              },
            }}
          >
            <ListItemIcon sx={{ color: pathname === item.path ? "primary.contrastText" : "text.primary" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* AppBar for mobile navigation */}
      <AppBar position="static" sx={{ display: { xs: "flex", md: "none" } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Paper elevation={3} sx={{ borderRadius: 2, display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Sidebar for desktop */}
        <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 275, borderRight: 1, borderColor: "divider" }}>
          {drawerContent}
        </Box>
        
        {/* Drawer for mobile */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={toggleDrawer}
          sx={{ "& .MuiDrawer-paper": { width: 260 } }}
        >
          {drawerContent}
        </Drawer>

        <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
      </Paper>
    </Container>
  );
}
