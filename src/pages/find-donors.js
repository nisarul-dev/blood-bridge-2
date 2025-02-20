import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Avatar } from "@mui/material"

const FindDonors = () => {
  return (
    <>
      <Box sx={{ py: 8, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" color="primary" gutterBottom>
            Find Blood Donors
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Connect with blood donors in your area and get the help you need.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 4, mb: 6 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Blood Type" select SelectProps={{ native: true }}>
                  <option value="">All Types</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Location" placeholder="Enter city or zip code" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button fullWidth variant="contained" color="primary" size="large">
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6].map((donor) => (
              <Grid item key={donor} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ width: 60, height: 60, mr: 2 }}>JD</Avatar>
                      <Typography variant="h6">John Doe</Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Blood Type: A+
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Location: New York, NY
                    </Typography>
                    <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
                      Contact Donor
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default FindDonors

