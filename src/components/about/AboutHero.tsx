import { Box, Container, Typography, Grid } from "@mui/material"

const AboutHero = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" color="text.primary" gutterBottom>
              About Our Company
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              We are a team of passionate individuals dedicated to delivering innovative solutions and exceptional
              service to our clients.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 2,
              }}
              alt="About us image"
              src="/placeholder.svg?height=400&width=600"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AboutHero

