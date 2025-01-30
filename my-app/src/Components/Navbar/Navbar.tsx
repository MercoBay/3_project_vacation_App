// Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" className={styles.navbar}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            className={styles.link}
          >
            HOME
          </Button>
          <Button
            component={Link}
            to="/vacations"
            color="inherit"
            className={styles.link}
          >
            VACATIONS
          </Button>
          {user?.role === 'admin' && (
            <Button
              component={Link}
              to="/admin/dashboard"
              color="inherit"
              className={styles.link}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              ADMIN PANEL
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!user ? (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                className={styles.link}
              >
                LOGIN
              </Button>
              <Button
                component={Link}
                to="/register"
                color="inherit"
                className={styles.link}
              >
                REGISTER
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              color="inherit"
              className={styles.link}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              LOGOUT
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

