import { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Avatar, Dialog, DialogContent, MenuItem } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "next/link";

const FindDonorsPage = () => {
  const [bloodType, setBloodType] = useState("");
  const [latitude, setLatitude] = useState(23.8103); // Default (Dhaka)
  const [longitude, setLongitude] = useState(90.4125);
  const [locationText, setLocationText] = useState("Generating location...");
  const [donors, setDonors] = useState([]);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLocationText = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        setLocationText(data.display_name || "Unknown location");
      } catch (error) {
        console.error("Error fetching location text:", error);
        setLocationText("Error generating location");
      }
    };

    fetchLocationText();
  }, [latitude, longitude]);

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
    handleSearch(); // Fetch donors on page load
  }, []);

  const LocationPicker = () => {
    useMapEvents({
      click: (e) => {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        setMapDialogOpen(false);
      },
    });
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" color="primary" gutterBottom>
          Find Blood Donors By Location
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Select a place on the map to find nearby blood donors.
        </Typography>

        {/* Form Section */}
        <Box component="form" noValidate sx={{ mt: 4, mb: 6 }}>
          <Grid container spacing={2} justifyContent="center">
            {/* Blood Type Selection */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Blood Type"
                select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="A%2B">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B%2B">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB%2B">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O%2B">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </TextField>
            </Grid>

            {/* Map Selection Button */}
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setMapDialogOpen(true)}
              >
                Select Location on Map
              </Button>
            </Grid>

            {/* Search Button */}
            <Grid item xs={12} sm={2}>
              <Button fullWidth variant="contained" color="primary" size="large" onClick={handleSearch}>
                Search
              </Button>
            </Grid>
          </Grid>

          {/* Latitude, Longitude & Location Display */}
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Latitude" value={latitude} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Longitude" value={longitude} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField fullWidth label="Location" value={locationText} InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        </Box>

        {/* Donor List */}
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
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      component={Link}
                      href={`/profile/${donor.username}`}
                    >
                      Contact Donor
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center" sx={{ mt: 4, ml: 'auto', mr: 'auto' }}>No donors found.</Typography>
          )}
        </Grid>

        {/* Map Dialog */}
        <Dialog open={mapDialogOpen} onClose={() => setMapDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogContent>
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={[latitude, longitude]} icon={customIcon} />
              <LocationPicker />
            </MapContainer>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default FindDonorsPage;
