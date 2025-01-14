import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

interface User {
  id: number;
  email: string;
  role: string;
  name?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/register', data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  }
};