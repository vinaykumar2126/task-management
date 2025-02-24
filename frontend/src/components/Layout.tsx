import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      background: 'linear-gradient(180deg, rgba(33,150,243,0.05) 0%, rgba(33,150,243,0) 100%)'
    }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(33,150,243,0.1)'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Task Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Container 
        sx={{ 
          mt: 4, 
          mb: 4,
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
