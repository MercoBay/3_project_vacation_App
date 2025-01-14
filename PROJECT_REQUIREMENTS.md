# Proyecto de Vacaciones - Requisitos

## Estructura de Base de Datos

### 1. Tabla de Roles (roles)
- role_id (PK)
- role_name (Admin, User)

### 2. Tabla de Usuarios (users)
- user_id (PK)
- first_name
- last_name
- email
- password
- role_id (FK)

### 3. Tabla de Países (countries)
- country_id (PK)
- country_name

### 4. Tabla de Vacaciones (vacations)
- vacation_id (PK)
- country_id (FK)
- description
- start_date
- end_date
- price
- image_filename

### 5. Tabla de Likes (likes)
- user_id (FK)
- vacation_id (FK)

## Requisitos Funcionales

### Roles de Usuario
1. **Admin**:
   - Ver vacaciones
   - Añadir vacaciones
   - Actualizar vacaciones
   - Eliminar vacaciones

2. **Usuario Regular**:
   - Ver vacaciones
   - Dar/quitar Like a vacaciones

### Validaciones
1. **Registro**:
   - Todos los campos obligatorios
   - Email válido
   - Contraseña mínimo 4 caracteres
   - Email único en sistema

2. **Vacaciones**:
   - Precio máximo: 10,000
   - Fecha fin > Fecha inicio
   - No fechas pasadas para nuevas vacaciones

### Datos Iniciales Requeridos
- 2 roles (Admin, User)
- Mínimo 2 usuarios (1 Admin, 1 User)
- Mínimo 10 países
- Mínimo 12 vacaciones 