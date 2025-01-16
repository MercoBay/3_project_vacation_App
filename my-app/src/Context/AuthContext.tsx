import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../Services/authService';
import type { User, LoginData } from '../api/api';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Aquí podrías validar el token con el backend
        }
        setLoading(false);
    }, []);

    const login = async (data: LoginData) => {
        try {
            const response = await authService.login(data);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            setIsAuthenticated(true);
            setIsAdmin(response.user.role_id === 1);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout: () => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            },
            loading,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);