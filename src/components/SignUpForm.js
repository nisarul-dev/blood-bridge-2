import { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Paper, Link, MenuItem, Select, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useRouter } from "next/router";
import he from "he";
import NextLink from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

const SignUpForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        phone_number: "",
        email: "",
        password: "",
        blood_group: "",
        address: "",
        medical_condition: "",
        smoker: "no",
        latitude: "",
        longitude: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [locationSelected, setLocationSelected] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost/BloodBridge/wp-json/blood-bridge/v1/register-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            setSuccess("Account created successfully! You can now log in.");
            setFormData({ 
                first_name: "", last_name: "", username: "", phone_number: "", 
                email: "", password: "", blood_group: "", address: "", 
                medical_condition: "", smoker: "no", latitude: "", longitude: "" 
            });

            // Redirect to login after 2 seconds
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    const LocationPicker = () => {
        const map = useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng;
                setFormData({ ...formData, latitude: lat, longitude: lng });
                setLocationSelected(true);

                // Reverse geocode to get the address
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                    .then(res => res.json())
                    .then(data => {
                        setFormData((prevState) => ({
                            ...prevState,
                            address: data.display_name
                        }));
                    });
            }
        });

        return locationSelected ? (
            <Marker position={[formData.latitude, formData.longitude]}>
                <Popup>{formData.address}</Popup>
            </Marker>
        ) : null;
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setFormData({ ...formData, latitude, longitude });

                // Reverse geocode to get the address
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(res => res.json())
                    .then(data => {
                        setFormData((prevState) => ({
                            ...prevState,
                            address: data.display_name
                        }));
                    });
            });
        }
    }, []);

    return (
        <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", bgcolor: "background.default", marginTop: "64px", marginBottom: "64px" }}>
            <Container maxWidth="lg">
                <Grid container spacing={0} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: "relative", height: { xs: "300px", md: "100%" } }}>
                            <img src="/login-bg.jpg" alt="Sign Up" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Create an Account
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                                Sign up to get started
                            </Typography>
                            {error && (
                                <Typography variant="body2" color="error" align="center" gutterBottom>
                                    {he.decode(error.replace(/<[^>]*>?/gm, ''))}
                                </Typography>
                            )}
                            {success && (
                                <Typography variant="body2" color="success" align="center" gutterBottom>
                                    {success}
                                </Typography>
                            )}
                            <form onSubmit={handleSignUp}>
                                {/* First Name & Last Name */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                {/* Username & Phone Number */}
                                <Grid container spacing={2} sx={{ mt: 0 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                {/* Password & Blood Group */}
                                <Grid container spacing={2} sx={{ mt: -1 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Blood Group</InputLabel>
                                            <Select
                                                name="blood_group"
                                                value={formData.blood_group}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="A+">A+</MenuItem>
                                                <MenuItem value="A-">A-</MenuItem>
                                                <MenuItem value="B+">B+</MenuItem>
                                                <MenuItem value="B-">B-</MenuItem>
                                                <MenuItem value="O+">O+</MenuItem>
                                                <MenuItem value="O-">O-</MenuItem>
                                                <MenuItem value="AB+">AB+</MenuItem>
                                                <MenuItem value="AB-">AB-</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                {/* Location Selector Button */}
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    onClick={() => setLocationSelected(false)} // Opens map for location picking
                                >
                                    Select Your Location on Map
                                </Button>

                                {/* Map Display */}
                                {!locationSelected && (
                                    <MapContainer center={[23.685, 90.356]} zoom={10} style={{ height: "300px", marginTop: "16px" }}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <LocationPicker />
                                    </MapContainer>
                                )}

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Latitude"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    required
                                />

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Longitude"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    required
                                />

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />

                                 {/* Medical Condition Field */}
                                 <TextField
                                    margin="0"
                                    fullWidth
                                    label="Medical Condition (if any)"
                                    name="medical_condition"
                                    value={formData.medical_condition}
                                    onChange={handleChange}
                                    placeholder="E.g. Diabetes, Hypertension, None"
                                    sx={{ mt: 1 }}
                                />

                                {/* Smoker Field (Radio Button) */}
                                <FormControl component="fieldset" sx={{ mt: 2 }}>
                                    <Typography variant="body1">Do you smoke?</Typography>
                                    <RadioGroup
                                        row
                                        name="smoker"
                                        value={formData.smoker}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>

                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Sign Up
                                </Button>
                            </form>
                            <Grid container justifyContent="center">
                                <Link href="/login" component={NextLink}>
                                    {"Already have an account? Log in"}
                                </Link>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default SignUpForm;
