import { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import he from "he";

export default function Login() {
    const router = useRouter();

    // If already logged in, redirect to home page
    const { isLoggedIn, login } = useAuth();
    if (isLoggedIn) {
        router.push("/");
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/BloodBridge/wp-json/jwt-auth/v1/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "An error occurred");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            login();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Login
            </Typography>
            {error && (
                <Typography variant="body2" color="error" align="center" gutterBottom>
                    {he.decode( error.replace(/<[^>]*>?/gm, '') )}
                </Typography>
            )}
            <form onSubmit={handleLogin}>
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
                    Login
                </Button>
            </form>
        </Box>
    );
}
