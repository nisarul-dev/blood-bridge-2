import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

export default function BloodRequests() {
  const requests = [
    { id: 1, date: "2023-05-20", requester: "Jane Smith", bloodType: "A+", status: "Pending" },
    { id: 2, date: "2023-05-15", requester: "Mike Johnson", bloodType: "O-", status: "Completed" },
    { id: 3, date: "2023-05-10", requester: "Sarah Brown", bloodType: "B+", status: "Cancelled" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning"
      case "Completed":
        return "success"
      case "Cancelled":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Blood Requests
      </Typography>
      <List>
        {requests.map((request) => (
          <ListItem key={request.id}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${request.requester} (${request.bloodType})`}
              secondary={`Requested on ${request.date}`}
            />
            <Chip label={request.status} color={getStatusColor(request.status)} size="small" />
          </ListItem>
        ))}
      </List>
    </>
  )
}

