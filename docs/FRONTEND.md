# Frontend Documentation

## Componentes Principales

### AuthContext
```typescript
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
}
```

### VacationsList
```typescript
interface Vacation {
    id: number;
    country: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageUrl: string;
    likes: number;
    isLiked: boolean;
} 