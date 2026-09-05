# Backend de administración

API REST con Node.js, Express, Supabase y contraseñas cifradas con bcrypt.

## 1. Crear las tablas en Supabase

1. Abre el proyecto en [Supabase](https://supabase.com/dashboard).
2. Ve a **SQL Editor**.
3. Pega y ejecuta el contenido de `supabase/schema.sql`.

## 2. Configurar variables de entorno

Copia `.env.example` a `.env` y completa:

```
SUPABASE_URL=https://bfekwmihfcfpsmfhifmf.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
JWT_SECRET=una-cadena-larga-y-aleatoria
```

La **service_role** está en: Project Settings → API → `service_role` (secret).  
Úsala solo en el servidor. No la expongas en el frontend.

## 3. Instalar y arrancar

```bash
cd backend
npm install
npm run dev
```

La API queda en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/health` | No | Estado del servidor |
| POST | `/api/auth/bootstrap` | No (solo si no hay admins) | Crea el primer superadmin |
| POST | `/api/auth/login` | No | Inicia sesión y devuelve JWT |
| GET | `/api/auth/me` | Bearer | Perfil del usuario autenticado |
| PATCH | `/api/auth/password` | Bearer | Cambia la propia contraseña |
| GET | `/api/admins` | admin / superadmin | Lista administradores |
| GET | `/api/admins/:id` | admin / superadmin | Detalle |
| POST | `/api/admins` | admin / superadmin | Crea administrador (bcrypt) |
| PATCH | `/api/admins/:id` | admin / superadmin | Actualiza nombre, rol, estado o contraseña |
| DELETE | `/api/admins/:id` | superadmin | Elimina administrador |
| GET | `/api/audit-logs` | admin / superadmin | Bitácora de acciones |

Roles: `superadmin`, `admin`, `operator`.

## Ejemplos

Crear el primer administrador:

```bash
curl -X POST http://localhost:3000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@empresa.com\",\"password\":\"ClaveSegura1\",\"fullName\":\"Admin Principal\"}"
```

Iniciar sesión:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@empresa.com\",\"password\":\"ClaveSegura1\"}"
```

Listar administradores:

```bash
curl http://localhost:3000/api/admins \
  -H "Authorization: Bearer TU_TOKEN"
```

Las contraseñas se cifran con bcrypt (12 rondas por defecto) antes de guardarse en `admins.password_hash`. El hash nunca se devuelve en las respuestas JSON.
