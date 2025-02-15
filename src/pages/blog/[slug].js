import { useRouter } from 'next/router';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Post() {
    const router = useRouter();
    const { slug } = router.query;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const fetchPost = async () => {
                try {
                    // Replace with your WordPress site's REST API URL
                    const response = await fetch(`http://localhost/BloodBridge/wp-json/wp/v2/posts?slug=${slug}`);
                    const data = await response.json();

                    if (data.length > 0) {
                        setPost(data[0]);
                    } else {
                        setPost(null); // No post found
                    }
                } catch (error) {
                    console.error('Error fetching post:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }
    }, [slug]);

    if (loading) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5">Post not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 8 }}>
            <Container>
                <Typography variant="h2" gutterBottom>
                    {post.title.rendered}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {new Date(post.date).toLocaleDateString()}
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </Container>
        </Box>
    );
}
