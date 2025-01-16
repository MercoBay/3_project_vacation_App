import axios from 'axios';
import type { Vacation } from '../types/vacation';

// Interfaces básicas
interface LoginData {
    email: string;
    password: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
}

interface LoginResponse {
    user: User;
    token: string;
}

export const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: { 'Content-Type': 'application/json' }
});

export const apiService = {
    vacations: {
        getAll: () => 
            api.get<Vacation[]>('/vacations').then(res => res.data),
        getById: (id: number) => 
            api.get<Vacation>(`/vacations/${id}`).then(res => res.data),
        create: (data: Partial<Vacation>) => 
            api.post<Vacation>('/vacations', data).then(res => res.data),
        update: (id: number, data: Partial<Vacation>) => 
            api.put<Vacation>(`/vacations/${id}`, data).then(res => res.data),
        delete: (id: number) => 
            api.delete(`/vacations/${id}`).then(res => res.data)
    }
};

export type { User, LoginData, LoginResponse, Vacation };
