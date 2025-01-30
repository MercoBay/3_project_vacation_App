import axios from 'axios';

// Crear instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
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
    price: number;
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
        register: async (data: RegisterData) => {
            try {
                const response = await api.post('/register', data);
                return response.data;
            } catch (error) {
                console.error('Registration error:', error);
                throw error;
            }
        },
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
        getAll: async () => {
            const response = await api.get('/vacations');
            return response.data;
        },
        create: async (data: Partial<Vacation>) => {
            const response = await api.post('/vacations', data);
            return response.data;
        },
        update: async (id: number, data: Partial<Vacation>) => {
            const response = await api.put(`/vacations/${id}`, data);
            return response.data;
        },
        delete: async (id: number) => {
            return api.delete(`/vacations/${id}`);
        }
    }
};

export default api;


// import axios from 'axios';

// // Crear instancia de axios
// const api = axios.create({
//     baseURL: 'http://localhost:5000',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // Interfaces
// interface LoginData {
//     email: string;
//     password: string;
// }

// interface RegisterData {
//     name: string;
//     email: string;
//     password: string;
// }

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     role_id: number;
// }

// interface Vacation {
//     id: number;
//     country_id: number;
//     description: string;
//     start_date: string;
//     end_date: string;
//     price: number;  //
//     image_url?: string;
// }
// // Interceptor para agregar el token a las peticiones
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// // API Service
// export const apiService = {
//     // Auth endpoints
//     auth: {
//         register: (data: RegisterData) => api.post('/users', data),
//         login: async (data: LoginData) => {
//             const response = await api.post('/login', data);
//             if (response.data.user) {
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//             }
//             return response.data;
//         },
//         logout: () => {
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');
//         }
//     },

//     // Users endpoints
//     users: {
//         getAll: () => api.get<User[]>('/users'),
//         getById: (id: number) => api.get<User>(`/users/${id}`),
//         update: (id: number, data: Partial<User>) => api.put(`/users/${id}`, data),
//         delete: (id: number) => api.delete(`/users/${id}`)
//     },

//     // Vacations endpoints
//     vacations: {
//         getAll: async () => {
//             const response = await fetch('/api/vacations');
//             return response.json();
//         },
//         create: async (data: Partial<Vacation>) => {
//             const response = await fetch('/api/vacations', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data)
//             });
//             return response.json();
//         },
//         update: async (id: number, data: Partial<Vacation>) => {
//             const response = await fetch(`/api/vacations/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data)
//             });
//             return response.json();
//         },
//         delete: async (id: number) => {
//             await fetch(`/api/vacations/${id}`, {
//                 method: 'DELETE'
//             });
//         }
//     }
// };

// export default api;