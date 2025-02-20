import { Box, Container, Typography, Button, Grid, Paper, Card, CardContent, Avatar } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import PeopleIcon from "@mui/icons-material/People"
import EventIcon from "@mui/icons-material/Event"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"


const testimonials = [
  {
    name: "John Doe",
    role: "Regular Donor",
    content:
      "BloodBridge made it easy for me to find donation centers and schedule appointments. I feel great knowing I'm helping save lives!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jane Smith",
    role: "Blood Recipient",
    content:
      "Thanks to BloodBridge, I was able to quickly find donors when I needed a rare blood type. This platform is a lifesaver!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Mike Johnson",
    role: "Blood Drive Organizer",
    content:
      "Organizing blood drives has never been easier. BloodBridge helps us reach more donors and make a bigger impact in our community.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Home() {
  return (
    <Box component="main">
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "common.white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
        }}
      >
        <Image src="/blood-donation-hero.jpg" alt="Blood Donation" layout="fill" objectFit="cover" quality={100} />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h1" align="center" gutterBottom>
            Welcome to BloodBridge
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Join our community of blood donors and help save lives in your area.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" component={Link} href="/donate" size="large">
                Donate Blood
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="inherit" component={Link} href="/find-donors" size="large">
                Find Donors
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Our Features
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <FavoriteIcon />,
                title: "Donate Blood",
                description: "Find nearby donation centers and schedule appointments.",
              },
              {
                icon: <LocalHospitalIcon />,
                title: "Find Donors",
                description: "Connect with blood donors in your area when you need help.",
              },
              {
                icon: <EventIcon />,
                title: "Blood Drives",
                description: "Discover and participate in local blood drive events.",
              },
              {
                icon: <PeopleIcon />,
                title: "Community",
                description: "Join a supportive community of donors and recipients.",
              },
            ].map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Paper
                  elevation={3}
                  sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <Box sx={{ color: "primary.main", fontSize: 60, mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" align="center" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography align="center">{feature.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Impact Section */}
      <Box sx={{ py: 8, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Our Impact
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: "10,000+", label: "Donors" },
              { number: "5,000+", label: "Lives Saved" },
              { number: "1,000+", label: "Blood Drives" },
            ].map((stat, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6">{stat.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {[
              { step: 1, title: "Sign Up", description: "Create your account and complete your profile." },
              {
                step: 2,
                title: "Find Opportunities",
                description: "Discover nearby donation centers or blood drives.",
              },
              { step: 3, title: "Donate", description: "Schedule an appointment and donate blood." },
              { step: 4, title: "Save Lives", description: "Your donation helps those in need in your community." },
            ].map((step, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main", mb: 2 }}>{step.step}</Avatar>
                    <Typography variant="h5" align="center" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography align="center">{step.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Testimonials
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <FormatQuoteIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
                    <Typography variant="body1" paragraph>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <Avatar src={testimonial.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1">{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 8, bgcolor: "primary.main", color: "primary.contrastText" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Join our community today and start saving lives through blood donation.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" color="secondary" size="large" component={Link} href="/signup">
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  )
}

