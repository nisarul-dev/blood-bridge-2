import { useEffect, useState } from "react";
import { Box, Typography, Grid, Avatar, Chip, CircularProgress } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <Box sx={{ height: 400, width: "100%", bgcolor: "grey.200" }} />,
});

export default function PersonalInfo({ customUser }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const currentUsername = customUser ? customUser : localStorage.getItem("username");
  console.log("New User" + currentUsername);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(`http://localhost/BloodBridge/wp-json/bloodbridge/v1/user?username=${currentUsername}`);
        const response = await fetch(`http://localhost/BloodBridge/wp-json/bloodbridge/v1/user?username=${currentUsername}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser({
          firstName: data.first_name,
          lastName: data.last_name,
          phoneNumber: data.phone_number,
          bloodGroup: data.blood_group[0],
          presentAddress: data.address,
          addressLatitude: parseFloat(data.latitude),
          addressLongitude: parseFloat(data.longitude),
          medicalCondition: data.medical_condition,
          isSmoker: data.smoker.toLowerCase() === "yes",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  if (!user) {
    return <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 5 }}>Failed to load user data</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          alt={`${user.firstName} ${user.lastName}`}
          src="/placeholder.svg?height=100&width=100"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Chip
          icon={<BloodtypeIcon />}
          label={user.bloodGroup}
          color="primary"
          sx={{ mt: 1, fontSize: "1.2rem", padding: "20px 10px" }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LocalPhoneIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="body1">{user.phoneNumber}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <LocationOnIcon sx={{ mr: 1, mt: 0.5 }} color="primary" />
          <Typography variant="body1">{user.presentAddress}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <MedicalInformationIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="body1">Medical Condition: {user.medicalCondition}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {user.isSmoker ? (
            <SmokingRoomsIcon sx={{ mr: 1 }} color="error" />
          ) : (
            <SmokeFreeIcon sx={{ mr: 1 }} color="success" />
          )}
          <Typography variant="body1">{user.isSmoker ? "Smoker" : "Non-smoker"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Location
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <MapComponent latitude={user.addressLatitude} longitude={user.addressLongitude} />
        </Box>
      </Grid>
    </Grid>
  );
}
