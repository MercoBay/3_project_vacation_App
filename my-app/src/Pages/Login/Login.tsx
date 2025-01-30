import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Añadido para manejar el estado de carga
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Activar el estado de carga

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      if (email === 'admin@example.com' && password === 'admin123') {
        navigate('/admin/dashboard');
      } else {
        navigate('/vacations');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className={styles.loginBox}>
        <Typography component="h1" variant="h4" gutterBottom>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" className={styles.alert}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Botón deshabilitado durante la carga
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Box className={styles.adminInfo}>
            <Typography variant="subtitle1" gutterBottom>
              Admin Access:
            </Typography>
            <Typography variant="body2">
              Email: <strong>admin@example.com</strong>
            </Typography>
            <Typography variant="body2">
              Password: <strong>admin123</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              (Admin can access the CRUD dashboard)
            </Typography>
          </Box>

          <Box className={styles.registerLink}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/register">Register here</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;





// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import styles from './Login.module.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await login({ email, password });
//       if (email === 'admin@example.com' && password === 'admin123') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/vacations');
//       }
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box className={styles.loginBox}>
//         <Typography component="h1" variant="h4" gutterBottom>
//           Sign In
//         </Typography>

//         {error && (
//           <Alert severity="error" className={styles.alert}>
//             {error}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign In
//           </Button>

//           <Box className={styles.adminInfo}>
//             <Typography variant="subtitle1" gutterBottom>
//               Admin Access:
//             </Typography>
//             <Typography variant="body2">
//               Email: admin@example.com
//             </Typography>
//             <Typography variant="body2">
//               Password: admin123
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
//               (Admin can access the CRUD dashboard)
//             </Typography>
//           </Box>

//           <Box className={styles.registerLink}>
//             <Typography variant="body2">
//               Don't have an account?{' '}
//               <a href="/register">Register here</a>
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
