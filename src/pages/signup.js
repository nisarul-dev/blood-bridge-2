import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/BloodBridge/wp-json/wp/v2/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "An error occurred");
            }

            setMessage("Signup successful! Please login.");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Signup
            </Typography>
            {message && (
                <Typography variant="body2" color="error" align="center" gutterBottom>
                    {message}
                </Typography>
            )}
            <form onSubmit={handleSignup}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: 2 }}
                >
                    Signup
                </Button>
            </form>
        </Box>
    );
}
