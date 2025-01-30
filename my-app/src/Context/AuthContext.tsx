import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
  role_id: number;  // Make role_id required
}

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log('Stored user data:', userData);
      return userData;
    }
    return null;
  });
  
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const isAdminUser = userData.role_id === 8;
      console.log('Is admin from stored data:', isAdminUser, 'role_id:', userData.role_id);
      return isAdminUser;
    }
    return false;
  });

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', email);
      const response = await fetch('http://127.0.0.1:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      console.log('Login response:', data);

      if (!data.token || !data.user) {
        throw new Error('Invalid response format');
      }

      // Asegurarnos de que role_id esté presente
      if (data.user.email === 'admin@admin.com') {
        data.user.role_id = 8;  // Forzar role_id para admin
      }

      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: data.token,
        role_id: data.user.role_id || (data.user.email === 'admin@admin.com' ? 8 : 1)
      };

      console.log('Setting user data:', userData);
      console.log('Setting admin status:', userData.role_id === 8);

      setUser(userData);
      setIsAdmin(userData.role_id === 8);
      localStorage.setItem('user', JSON.stringify(userData));
      
      navigate('/vacations');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Efecto para sincronizar isAdmin con el user.role_id
  useEffect(() => {
    if (user) {
      const shouldBeAdmin = user.role_id === 8;
      console.log('Syncing admin status:', shouldBeAdmin, 'current role_id:', user.role_id);
      setIsAdmin(shouldBeAdmin);
    }
  }, [user]);

  const value = {
    user,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// import React, { createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   token: string;
//   role?: string;
// }

// export interface AuthContextType {
//   user: User | null;
//   isAdmin: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Invalid credentials');
//       }

//       const data = await response.json();

//       const userData: User = {
//         id: data.user.id,
//         name: data.user.name || email.split('@')[0], // Extract name from email
//         email: data.user.email,
//         token: data.user.token,
//         role: data.user.role_id === 1 ? 'admin' : 'user', // Map role ID
//       };

//       setUser(userData);
//       setIsAdmin(userData.role === 'admin');

//       // Navigate based on role
//       if (data.user.role_id === 1) {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/vacations');
//       }
//     } catch (error: any) {
//       console.error('Login error:', error.message || error);
//       throw error; // Re-throw the error for the calling component to handle
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAdmin(false);
//     navigate('/login');
//   };

//   const value = {
//     user,
//     isAdmin,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


