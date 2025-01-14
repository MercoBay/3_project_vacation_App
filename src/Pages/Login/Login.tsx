// Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { apiService } from '../../Services/api';
import styles from './Login.module.css';

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await apiService.auth.login(formData);
            // Guardar el token si lo recibes del backend
            localStorage.setItem('token', response.token);
            navigate('/vacations');
        } catch (err: any) {
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" className={styles.container}>
            <Paper elevation={3} className={styles.loginBox}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div className={styles.iconWrapper}>
                        <LockOutlinedIcon />
                    </div>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                    <Typography variant="body2" className={styles.registerLink}>
                        ¿No tienes una cuenta?{' '}
                        <a href="/register">Regístrate aquí</a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
