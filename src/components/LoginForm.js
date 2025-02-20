import { useState } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Paper, Link } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import he from "he";

const LoginForm = () => {
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
            const response = await fetch("http://localhost:8080/test-wp-2025/wp-json/jwt-auth/v1/token", {
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
        <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", bgcolor: "background.default" }}>
            <Container maxWidth="lg">
                <Grid container spacing={0} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: "relative", height: { xs: "300px", md: "100%" } }}>
                            <Image src="/login-bg.jpg?height=600&width=600" alt="Login" layout="fill" objectFit="cover" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                                Please enter your credentials to log in
                            </Typography>
                            <Box component="div" sx={{ mt: 1 }}>
                                {error && (
                                    <Typography variant="body2" color="error" align="center" gutterBottom>
                                        {he.decode(error.replace(/<[^>]*>?/gm, ''))}
                                    </Typography>
                                )}
                                <form onSubmit={handleLogin}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                        label="Username or Email Address"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        Sign In
                                    </Button>
                                </form>
                                <Grid container justifyContent="center">
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default LoginForm

