import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material"

const Donate = () => {
  return (
    <>
      <Box sx={{ py: 8, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" color="primary" gutterBottom>
            Donate Blood, Save Lives
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Your donation can make a difference. Find a donation center near you and schedule your appointment today.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, height: "100%" }}>
                <Typography variant="h4" gutterBottom color="primary">
                  Find a Donation Center
                </Typography>
                <Typography variant="body1" paragraph>
                  Use our location-based search to find the nearest blood donation center or upcoming blood drive in
                  your area.
                </Typography>
                <Button variant="contained" color="primary">
                  Search Locations
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, height: "100%" }}>
                <Typography variant="h4" gutterBottom color="primary">
                  Schedule an Appointment
                </Typography>
                <Typography variant="body1" paragraph>
                  Ready to donate? Schedule your appointment online and help save lives in your community.
                </Typography>
                <Button variant="contained" color="secondary">
                  Schedule Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Donate

