import { Box, Container, Typography, Paper } from "@mui/material"

const OurMission = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At our core, we strive to empower businesses with cutting-edge technology solutions that drive growth,
            efficiency, and innovation. Our mission is to be a trusted partner in our clients' success, delivering
            tailored solutions that address their unique challenges and unlock new opportunities.
          </Typography>
          <Typography variant="body1">
            We are committed to fostering a culture of continuous learning, collaboration, and excellence, ensuring that
            we remain at the forefront of technological advancements and industry best practices.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default OurMission

