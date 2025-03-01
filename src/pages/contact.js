import { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Alert, Paper } from '@mui/material';
import ContactInfo from '../components/contact/ContactInfo';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        formID: 'cbd0c4a',
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
            const response = await fetch('https://nisarul.com/bloodbridge/wp-json/contact-form-7/v1/contact-forms/50/feedback', {
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
        <>
            <Box sx={{ py: 8, bgcolor: "background.default" }}>
                <Container maxWidth="md">
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h3" align="center" gutterBottom>
                            Get in Touch
                        </Typography>
                        <Typography variant="body1" align="center" paragraph>
                            Have questions or want to learn more? Fill out the form below, and we'll get back to you as soon as
                            possible.
                        </Typography>
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
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ mt: 3, mb: 2 }}
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
                    </Paper>
                </Container>
            </Box>
            <ContactInfo />
        </>
    );
}
