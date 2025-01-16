# Proyecto de Vacaciones - Documentación Full Stack

## Backend (Flask)

### Estructura de Archivos
```
backend/
├── models/
│   ├── db_config.py
│   ├── countries.py
│   ├── likes.py
│   ├── roles.py
│   ├── users.py
│   └── vacations.py
├── routes/
│   ├── auth_routes.py
│   ├── country_routes.py
│   ├── likes_routes.py
│   ├── roles_routes.py
│   ├── users_routes.py
│   └── vacations_routes.py
├── app.py
└── requirements.txt
```

### Endpoints Principales
1. **Autenticación**
   - POST /login
   - POST /register

2. **Vacaciones**
   - GET /vacations
   - POST /vacations
   - PUT /vacations/:id
   - DELETE /vacations/:id

3. **Likes**
   - POST /likes
   - DELETE /likes
   - GET /likes/user/:id

## Frontend (React + TypeScript)

### Estructura de Archivos
```
src/
├── Components/
│   ├── Navbar/
│   └── ProtectedRoute/
├── Context/
│   └── AuthContext.tsx
├── Pages/
│   ├── Admin/
│   │   └── AdminDashboard.tsx
│   └── Vacations/
│       └── VacationsList.tsx
└── Services/
    └── api.ts
```

### Configuración de Base de Datos
```sql
-- Ver PROJECT_REQUIREMENTS.md para el esquema completo
``` 