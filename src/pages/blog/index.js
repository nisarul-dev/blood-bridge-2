import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material';
import Link from 'next/link';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page = 1) => {
        setLoading(page === 1); // Show loading spinner only on the first load
        setLoadingMore(page > 1); // Show "loading more" spinner for subsequent loads

        try {
            // Replace with your WordPress site's REST API URL
            const response = await fetch(`http://localhost:8080/another-wordpress/wp-json/wp/v2/posts?page=${page}&per_page=6`);
            const data = await response.json();
            setPosts((prev) => (page === 1 ? data : [...prev, ...data])); // Append new posts on "Load More"
            setTotalPages(Number(response.headers.get('X-WP-TotalPages')));
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
            <Container>
                <Typography variant="h2" align="center" gutterBottom>
                    Blog
                </Typography>
                <Typography align="center" sx={{ mb: 4 }}>
                    Explore our latest posts and updates.
                </Typography>

                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Card>
                                <CardContent>
                                    <h5>
                                        {post.title.rendered}
                                    </h5>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {new Date(post.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        {post.excerpt.rendered.replace(/<[^>]*>?/gm, '')}
                                    </Typography>
                                    <Link href={`/blog/${post.slug}`} passHref>
                                        <Typography variant="body1" color="primary">
                                            Read More
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {loading && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {currentPage < totalPages && !loading && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button onClick={handleLoadMore} variant="outlined" color="primary" disabled={loadingMore}>
                            {loadingMore ? 'Loading...' : 'Load More'}
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
