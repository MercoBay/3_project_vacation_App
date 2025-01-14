// Navbar.tsx
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  Box 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vacation Planner
        </Typography>
        
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          <Button color="inherit" component={RouterLink} to="/vacations">
            Vacations
          </Button>
          
          {!isAuthenticated && (
            <>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            </>
          )}
          
          {isAuthenticated && isAdmin && (
            <Button color="inherit" component={RouterLink} to="/admin/dashboard">
              Admin Dashboard
            </Button>
          )}
          
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem component={RouterLink} to="/" onClick={handleClose}>
            Home
          </MenuItem>
          <MenuItem component={RouterLink} to="/about" onClick={handleClose}>
            About
          </MenuItem>
          <MenuItem component={RouterLink} to="/vacations" onClick={handleClose}>
            Vacations
          </MenuItem>
          
          {!isAuthenticated && (
            <>
              <MenuItem component={RouterLink} to="/register" onClick={handleClose}>
                Register
              </MenuItem>
              <MenuItem component={RouterLink} to="/login" onClick={handleClose}>
                Login
              </MenuItem>
            </>
          )}
          
          {isAuthenticated && isAdmin && (
            <MenuItem component={RouterLink} to="/admin/dashboard" onClick={handleClose}>
              Admin Dashboard
            </MenuItem>
          )}
          
          {isAuthenticated && (
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

