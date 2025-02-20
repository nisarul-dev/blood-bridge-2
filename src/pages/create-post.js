import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

export default function CreatePost() {
    const router = useRouter();
    const { isLoggedIn, login } = useAuth();
    
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]); // Ensure dependencies are correct

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please log in first.");
            return;
        }

        try {
            const response = await fetch("http://localhost/BloodBridge/wp-json/wp/v2/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content, status: "publish" }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "An error occurred");
            }

            setMessage("Post created successfully!");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Create Post
            </Typography>
            {message && (
                <Typography variant="body2" color="error" align="center" gutterBottom>
                    {message}
                </Typography>
            )}
            <form onSubmit={handleCreatePost}>
                <TextField
                    fullWidth
                    label="Post Title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Post Content"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: 2 }}
                >
                    Create Post
                </Button>
            </form>
        </Box>
    );
}
