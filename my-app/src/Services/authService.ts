import { api } from '../api/api';
import type { LoginData, LoginResponse } from '../api/api';

export const authService = {
    login: (data: LoginData) => 
        api.post<LoginResponse>('/login', data).then(res => res.data)
};