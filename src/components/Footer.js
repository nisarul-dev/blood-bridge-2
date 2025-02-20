import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About BloodConnect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              BloodConnect is a platform dedicated to connecting blood donors with those in need. Our mission is to save
              lives by making blood donation easier and more accessible.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block">
              Home
            </Link>
            <Link href="/donate" color="inherit" display="block">
              Donate
            </Link>
            <Link href="/find-donors" color="inherit" display="block">
              Find Donors
            </Link>
            <Link href="/blood-drives" color="inherit" display="block">
              Blood Drives
            </Link>
            <Link href="/about" color="inherit" display="block">
              About Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Blood Drive Street
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cityville, State 12345
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@bloodconnect.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://bloodconnect.com/">
              BloodConnect
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <IconButton aria-label="Facebook" color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="Twitter" color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="LinkedIn" color="primary">
            <LinkedInIcon />
          </IconButton>
          <IconButton aria-label="Instagram" color="primary">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

