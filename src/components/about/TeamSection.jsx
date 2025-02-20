import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, IconButton } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"

const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "John has over 20 years of experience in the tech industry and is passionate about innovation.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    name: "Jane Doe",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Jane is an expert in cloud computing and leads our technical strategy and development.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    name: "Mike Johnson",
    role: "Head of Customer Success",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Mike ensures our clients receive top-notch support and achieve their goals with our solutions.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
]

const TeamSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" height="300" image={member.image} alt={member.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {member.bio}
                  </Typography>
                  <Box>
                    <IconButton aria-label="LinkedIn" href={member.linkedin} target="_blank">
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton aria-label="Twitter" href={member.twitter} target="_blank">
                      <TwitterIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default TeamSection

