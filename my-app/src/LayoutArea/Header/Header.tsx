// Header.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Header.module.css";

function Header(): JSX.Element {
    const { isAuthenticated, isAdmin, logout } = useAuth();

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">Vacation Planner</Link>
            </div>
            
            <nav className={styles.nav}>
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
            </nav>
        </div>
    );
}

export default Header;
