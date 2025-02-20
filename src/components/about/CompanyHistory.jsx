import { Box, Container, Typography } from "@mui/material"
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab"
import "@mui/lab/themeAugmentation"

const milestones = [
  { year: 2010, event: "Company founded" },
  { year: 2013, event: "Launched first major product" },
  { year: 2015, event: "Expanded to international markets" },
  { year: 2018, event: "Acquired leading competitor" },
  { year: 2020, event: "Reached 1 million customers" },
  { year: 2023, event: "Opened new headquarters" },
]

const CompanyHistory = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Our Journey
        </Typography>
        <Timeline position="alternate">
          {milestones.map((milestone, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index !== milestones.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="span">
                  {milestone.year}
                </Typography>
                <Typography>{milestone.event}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  )
}

export default CompanyHistory

