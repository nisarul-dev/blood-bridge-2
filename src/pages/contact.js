import { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Alert } from '@mui/material';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        formID: 'd7ab88a',
    });
    const [responseMessage, setResponseMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('your-name', formData.name);
        form.append('your-email', formData.email);
        form.append('your-subject', formData.subject);
        form.append('your-message', formData.message);
        form.append('_wpcf7_unit_tag', formData.formID);

        try {
            // Replace with your WordPress Contact Form 7 REST endpoint
            const response = await fetch('http://localhost:8080/another-wordpress/wp-json/contact-form-7/v1/contact-forms/7/feedback', {
                method: 'POST',
                body: form,
            });

            const result = await response.json();

            if (result.status === 'mail_sent') {
                setResponseMessage({ type: 'success', text: 'Your message has been sent successfully!' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setResponseMessage({ type: 'error', text: result.message || 'Failed to send your message. Please try again.' });
            }
        } catch (error) {
            setResponseMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
            <Container>
                <Typography variant="h2" align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Typography align="center" sx={{ mb: 4 }}>
                    Have a question or need assistance? Fill out the form below to reach us.
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Your Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                Send Message
                            </Button>
                        </form>

                        {responseMessage && (
                            <Alert
                                severity={responseMessage.type}
                                sx={{ mt: 4 }}
                            >
                                {responseMessage.text}
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
