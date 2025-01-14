import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role_id?: number;
}

interface LoginData {
    email: string;
    password: string;
}

export interface Vacation {
    id: number;
    country_id: number;
    description: string;
    start_date: string;
    end_date: string;
    price: string;
    image_url: string;
}

export const apiService = {
    auth: {
        register: async (data: RegisterData) => {
            try {
                const response = await api.post('/users', {
                    ...data,
                    role_id: 2  // Usuario normal
                });
                return response.data;
            } catch (error: any) {
                if (error.response?.status === 409) {
                    throw new Error('El email ya está registrado');
                }
                throw new Error(error.response?.data?.error || 'Error al registrar usuario');
            }
        },
        login: async (data: LoginData) => {
            const response = await api.post('/login', data);
            return response.data;
        }
    },
    vacations: {
        getAll: () => api.get<Vacation[]>('/vacations').then(res => res.data),
        // ...otros métodos
    }
};

export default api;
