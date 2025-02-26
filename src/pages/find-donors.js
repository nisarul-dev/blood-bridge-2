import { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Avatar, MenuItem } from "@mui/material";

const FindDonors = () => {
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [donors, setDonors] = useState([]);

  const handleSearch = async () => {
    let url = `http://localhost/BloodBridge/wp-json/bloodbridge/v1/users/?`;
    if (bloodType) url += `blood_group=${bloodType}&`;
    if (latitude && longitude) url += `latitude=${latitude}&longitude=${longitude}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDonors(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  useEffect(() => {
    if (location) {
      // Dummy function to get lat/lon from location (Replace with actual API call if needed)
      const fetchCoordinates = async () => {
        // Example: Hardcoded coordinates, replace with geocoding API
        setLatitude(23.8103);
        setLongitude(90.4125);
      };
      fetchCoordinates();
    }
  }, [location]);

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" color="primary" gutterBottom>
          Find Blood Donors By Location
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Connect with blood donors in your area and get the help you need.
        </Typography>
        <Box component="form" noValidate sx={{ mt: 4, mb: 6 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Blood Type" select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Location" placeholder="Enter city or zip code" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button fullWidth variant="contained" color="primary" size="large" onClick={handleSearch}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4}>
          {donors.length > 0 ? (
            donors.map((donor) => (
              <Grid item key={donor.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{donor.name.charAt(0)}</Avatar>
                      <Typography variant="h6">{donor.name}</Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Blood Type: {donor.blood_group}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Location: {donor.address}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Distance: {donor.distance_from_hospital} km
                    </Typography>
                    <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
                      Contact Donor
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center" sx={{ mt: 4 }}>No donors found.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default FindDonors;
