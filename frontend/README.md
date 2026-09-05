# Frontend SvelteKit

Panel de administración con SvelteKit, Tailwind CSS, Clerk y cliente REST hacia el backend Node.js.

Clerk no publica el paquete `@clerk/sveltekit`. Este proyecto usa `svelte-clerk`, el SDK actual para Svelte 5 / SvelteKit 2, con los mismos componentes (`SignIn`, `UserButton`, `SignOutButton`).

## 1. Variables de entorno

Copia `.env.example` a `.env` y completa las claves de Clerk (Dashboard → API Keys) y, si aplica, Resend.

En Clerk, asigna el rol en **Users → public metadata**:

```json
{ "role": "admin" }
```

o `"operador"`. Sin metadata, el usuario entra como operador.

Para que el JWT de sesión incluya el rol, en Clerk → Sessions → Customize session token:

```json
{
  "metadata": "{{user.public_metadata}}"
}
```

## 2. Arranque

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`. El backend debe estar en `http://localhost:3000`.

## Rutas

| Ruta | Acceso |
|------|--------|
| `/sign-in` | Iniciar sesión |
| `/sign-up` | Registrarse |
| `/sign-out` | Cerrar sesión |
| `/dashboard` | Admin: resumen. Operador: panel restringido |
| `/dashboard/usuarios` | Solo admin |
| `/dashboard/auditoria` | Solo admin |

El header y la barra lateral incluyen `UserButton` y `SignOutButton`.

## Integraciones

- `src/lib/services/backend.ts`: cliente REST (`/api/admins`, `/api/audit-logs`, `/api/health`).
- `src/lib/services/resend.ts`: envío de correos. Endpoint `POST /api/notifications/email`.

El backend actual valida su propio JWT (bcrypt/login). El frontend ya envía el token de Clerk; cuando el API verifique esa sesión, usuarios y auditoría se cargarán sin cambios de UI.
