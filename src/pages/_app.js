import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/themes/theme';
import Layout from '@/components/Layout';
import { AuthProvider } from '@/context/AuthContext.js';
import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}
