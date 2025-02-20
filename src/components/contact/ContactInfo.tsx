import { Box, Container, Typography, Grid, Paper } from "@mui/material"
import { Phone, Email, LocationOn } from "@mui/icons-material"

const contactInfo = [
  { icon: <Phone />, title: "Phone", content: "+1 (123) 456-7890" },
  { icon: <Email />, title: "Email", content: "info@example.com" },
  { icon: <LocationOn />, title: "Address", content: "123 Main St, City, Country" },
]

const ContactInfo = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Contact Information
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={2} sx={{ p: 3, textAlign: "center", height: "100%" }}>
                <Box sx={{ color: "primary.main", mb: 2 }}>{info.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {info.title}
                </Typography>
                <Typography variant="body1">{info.content}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactInfo

