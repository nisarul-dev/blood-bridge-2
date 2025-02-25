"use client"

import { Box, Container, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { usePathname } from "next/navigation"
import NextLink from "next/link"
import PersonIcon from "@mui/icons-material/Person"
import BloodtypeIcon from "@mui/icons-material/Bloodtype"
import RequestPageIcon from "@mui/icons-material/RequestPage"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";


const menuItems = [
  { name: "Personal Information", icon: <PersonIcon />, path: "/profile" },
  { name: "Recent Donations", icon: <BloodtypeIcon />, path: "/profile/donations" },
  { name: "Blood Requests", icon: <RequestPageIcon />, path: "/profile/blood-requests" },
  { name: "Fund Donations", icon: <AttachMoneyIcon />, path: "/profile/funds" },
]

export default function ProfileLayout({ children }) {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  
  useEffect(() => {
      if (!isLoggedIn) {
          router.push("/");
      }
  }, [isLoggedIn, router]); // Ensure dependencies are correct
    
  const pathname = usePathname();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, display: "flex" }}>
        <Box sx={{ minWidth: 260, borderRight: 1, borderColor: "divider" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.name}
                component={NextLink}
                href={item.path}
                selected={pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box> {/* ✅ FIXED HERE */}
        </Paper>
    </Container>
  )
}

