// Menu.tsx
import { Link } from 'react-router-dom';

const Menu = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </nav>
);

export default Menu;

