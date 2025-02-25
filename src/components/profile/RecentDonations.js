import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material"
import BloodtypeIcon from "@mui/icons-material/Bloodtype"

export default function RecentDonations() {
  const donations = [
    { id: 1, date: "2023-05-15", location: "City Hospital", amount: "450ml" },
    { id: 2, date: "2023-03-02", location: "Red Cross Blood Drive", amount: "500ml" },
    { id: 3, date: "2022-12-20", location: "Community Center", amount: "450ml" },
  ]

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Recent Blood Donations
      </Typography>
      <List>
        {donations.map((donation) => (
          <ListItem key={donation.id}>
            <ListItemAvatar>
              <Avatar>
                <BloodtypeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Donated ${donation.amount} on ${donation.date}`} secondary={donation.location} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

