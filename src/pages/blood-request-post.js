"use client"

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Container, Typography, TextField, Button, Box, Grid, Snackbar, Alert, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Dynamically import Leaflet and related components
const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false });

export default function BloodRequestPost() {
  const [formData, setFormData] = useState({
    blood_group: "",
    blood_amount: "",
    hospital_name: "",
    hospital_address: "",
    hospital_latitude: "",
    hospital_longitude: "",
    bookings: [{ booking_date: "", status: "open" }],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (event, index) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      bookings: prevData.bookings.map((booking, i) =>
        i === index ? { ...booking, booking_date: value } : booking
      ),
    }));
  };

  const addBooking = () => {
    setFormData((prevData) => ({
      ...prevData,
      bookings: [...prevData.bookings, { booking_date: "", status: "open" }],
    }));
  };

  const removeBooking = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      bookings: prevData.bookings.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const apiData = {
      ...formData,
      bookings: formData.bookings.map((booking) => ({
        ...booking,
        booking_date: booking.booking_date || null,
      })),
    };

    try {
      const response = await fetch("https://nisarul.com/bloodbridge/wp-json/bloodbridge/v1/blood-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error("Failed to create blood request");
      }

      const result = await response.json();
      setSnackbar({
        open: true,
        message: `Blood request created successfully. Request ID: ${result.blood_request_id}`,
        severity: "success",
      });

      setFormData({
        blood_group: "",
        blood_amount: "",
        hospital_name: "",
        hospital_address: "",
        hospital_latitude: "",
        hospital_longitude: "",
        bookings: [{ booking_date: "", status: "open" }],
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Blood Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Amount"
                name="blood_amount"
                value={formData.blood_amount}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hospital Name"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hospital Address"
                name="hospital_address"
                value={formData.hospital_address}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <LeafletMap setFormData={setFormData} />
            </Grid>
            {formData.bookings.map((booking, index) => (
              <Grid item xs={12} key={index} container alignItems="center" spacing={2}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    label={`Booking Date ${index + 1}`}
                    type="date"
                    value={booking.booking_date}
                    onChange={(e) => handleDateChange(e, index)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item>
                  {index === formData.bookings.length - 1 && (
                    <IconButton onClick={addBooking} color="primary">
                      <AddIcon />
                    </IconButton>
                  )}
                  {formData.bookings.length > 1 && (
                    <IconButton onClick={() => removeBooking(index)} color="secondary">
                      <RemoveIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit Blood Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
