import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../Services/authService';

interface User {
    id: number;
    email: string;
    role: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
            setUser(response.user);
            setIsAuthenticated(true);
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
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);