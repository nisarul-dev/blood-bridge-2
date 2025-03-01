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
    let url = `https://nisarul.com/bloodbridge/wp-json/bloodbridge/v1/users/?`;
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
          Top Donors
        </Typography>
        <Typography align="center" sx={{ mb: 8 }}></Typography>

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
