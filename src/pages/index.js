import { Box, Button, Grid, Typography, Container } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h1" gutterBottom>
            Welcome to Blood Bridge
          </Typography>
          <Typography variant="h5" gutterBottom>
            Connecting communities for life-saving blood donations.
          </Typography>
          <Button component={Link} variant="contained" href="/about" color="secondary" size="large" sx={{ 'mr': 2 }} >
            Get Started
          </Button>
          <Link href="/contact" passHref>
            <Button variant="outlined" color="white" size="large">
              Learn More
            </Button>
          </Link>
        </Container>
      </Box >

      {/* Features Section */}
      <Box Box sx={{ py: 8, backgroundColor: 'background.default' }
      }>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" color="primary">
                Area-Based Notifications
              </Typography>
              <Typography>
                Get real-time alerts for blood requests in your vicinity.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" color="primary">
                Donor Profiles
              </Typography>
              <Typography>
                Easily find registered donors and their contact details.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" color="primary">
                Secure Platform
              </Typography>
              <Typography>
                Your data is protected with top-notch security measures.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      < Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            About Blood Bridge
          </Typography>
          <Typography align="center">
            Blood Bridge is an innovative platform designed to connect blood
            donors with those in need. Our mission is to ensure that no one
            suffers due to a lack of blood during emergencies.
          </Typography>
        </Container>
      </Box >

      {/* Footer */}
      < Box
        sx={{
          py: 4,
          backgroundColor: 'primary.main',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography>© 2025 Blood Bridge. All Rights Reserved.</Typography>
      </Box >
    </Box >
  );
}
