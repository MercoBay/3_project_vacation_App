// Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Vacation Planner</Link>
      </div>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/vacations">Vacations</Link>
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <Link to="/admin/dashboard">Admin Panel</Link>
            )}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

