import axios from 'axios';

// Crear instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interfaces
interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
}

interface Vacation {
    id: number;
    country_id: number;
    description: string;
    start_date: string;
    end_date: string;
    price: number;  //
    image_url?: string;
}
// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API Service
export const apiService = {
    // Auth endpoints
    auth: {
        register: (data: RegisterData) => api.post('/users', data),
        login: async (data: LoginData) => {
            const response = await api.post('/login', data);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        },
        logout: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },

    // Users endpoints
    users: {
        getAll: () => api.get<User[]>('/users'),
        getById: (id: number) => api.get<User>(`/users/${id}`),
        update: (id: number, data: Partial<User>) => api.put(`/users/${id}`, data),
        delete: (id: number) => api.delete(`/users/${id}`)
    },

    // Vacations endpoints
    vacations: {
        getAll: () => api.get('/vacations').then(res => res.data),
        getById: (id: number) => api.get<Vacation>(`/vacations/${id}`).then(res => res.data),
        create: (data: Partial<Vacation>) => api.post('/vacations', data).then(res => res.data),
        update: (id: number, data: Partial<Vacation>) => api.put(`/vacations/${id}`, data).then(res => res.data),
        delete: (id: number) => api.delete(`/vacations/${id}`).then(res => res.data)
    }
};

export default api;