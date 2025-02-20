import { Box, Container, Typography, Grid } from '@mui/material';

export default function About() {
    return (
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
            <Container>
                {/* About Us Section */}
                <Typography variant="h2" align="center" gutterBottom>
                    About Blood Bridge
                </Typography>
                <Typography align="center" sx={{ mb: 4 }}>
                    Blood Bridge is a platform designed to bring communities together to
                    save lives. Our goal is to make it easier for donors and recipients to
                    connect, ensuring timely help during emergencies.
                </Typography>

                {/* Mission Section */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            Our Mission
                        </Typography>
                        <Typography>
                            At Blood Bridge, we aim to create a world where no one suffers due
                            to the unavailability of blood. Through innovative technology and
                            a dedicated community, we’re bridging the gap between those in
                            need and those who can help.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            Our Vision
                        </Typography>
                        <Typography>
                            To build a reliable, secure, and accessible platform that empowers
                            individuals to make a difference in their communities by becoming
                            blood donors.
                        </Typography>
                    </Grid>
                </Grid>

                {/* Impact Section */}
                <Typography variant="h4" align="center" color="primary" gutterBottom>
                    Our Impact
                </Typography>
                <Typography align="center" sx={{ mb: 4 }}>
                    Since our inception, we have connected thousands of donors with those
                    in need. Our platform continues to grow, with new features and
                    improvements that enhance the experience for our users.
                </Typography>

                {/* Closing Statement */}
                <Typography variant="body1" align="center">
                    Join us in making a difference. Together, we can save lives and build
                    a stronger, healthier community.
                </Typography>
            </Container>
        </Box>
    );
}
