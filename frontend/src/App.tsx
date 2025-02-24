import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/tasks" 
              element={
                <Layout>
                  <Tasks />
                </Layout>
              } 
            />
            <Route path="/" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
