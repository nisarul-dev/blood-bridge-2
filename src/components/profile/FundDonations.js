import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"

export default function FundDonations() {
  const donations = [
    { id: 1, date: "2023-05-18", amount: 50, campaign: "Emergency Blood Drive" },
    { id: 2, date: "2023-04-05", amount: 100, campaign: "Annual Fundraiser" },
    { id: 3, date: "2023-02-14", amount: 25, campaign: "Valentine's Day Blood Drive" },
  ]

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Fund Donations
      </Typography>
      <List>
        {donations.map((donation) => (
          <ListItem key={donation.id}>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`$${donation.amount} on ${donation.date}`} secondary={donation.campaign} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

