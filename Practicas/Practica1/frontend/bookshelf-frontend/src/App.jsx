import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import darkTheme from './theme/darkTheme';

import LoginView from './views/Auth/LoginView';
import RegisterView from './views/Auth/RegisterView';
import DashboardAdmin from "./views/Admin/DashboardAdmin";
import DashboardUser from "./views/User/DashboardUser";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="sm">
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/user" element={<DashboardUser />} />
              {/* Redirige la raíz al login */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
export default App;
