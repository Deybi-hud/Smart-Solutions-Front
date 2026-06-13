# Smart Solutions — Resumen de cambios aplicados

> Fecha: 2026-06-13  
> Ramas: `develop` en todos los repositorios

---

## Gateway API (`Smart-Solutions-Gateway-API`)

### `JwtGatewayFilter.java` — corregido
- **Problema:** `path.contains("/api/v1/auth")` es comparación por substring, vulnerable a bypass (p.ej. `/api/v1/subscriptions/cancel/api/v1/auth/token`).
- **Fix:** Reemplazado por `AntPathMatcher` con una lista de patrones seguros (`/api/v1/auth/**`, `/api/v1/regions/**`, etc.).

### `RouteConfig.java` — nuevo archivo
- **Problema:** El `application.yaml` no rutea `/api/v1/admin/**`, `/api/v1/roles/**` ni `/api/v1/healths/**`, por lo que esos endpoints del Auth API eran inaccesibles desde el Gateway.
- **Fix:** Se añade un `RouteLocator` bean que agrega esas tres rutas al `auth-service` sin modificar el YAML.

---

## Auth API (`Smart-Solutions-Auth-API`)

### `UserDTO.java` — campo `id` añadido
- **Problema:** `UserDTO.Response` no exponía el `id` del usuario, impidiendo que el frontend llamara a la Core API (que requiere `userId` en la URL).
- **Fix:** Se añade `Long id` como primer campo del record `Response`.

### `UserService.java` — constructores actualizados
- Todos los métodos que retornan `UserDTO.Response` ahora incluyen `user.getId()` como primer argumento, en concordancia con el DTO corregido.
- Métodos actualizados: `userRegister`, `profile`, `processUpdate`, `getUserByEmail`, `getUserByPhone`, `listUsers`.

### `AuthService.java` — bug de refresh token corregido
- **Problema:** Si `jwtService.isTokenValid(refreshToken)` retornaba `false`, el método terminaba silenciosamente devolviendo HTTP 200 sin cookie, engañando al cliente.
- **Fix:** Se lanza `RuntimeException("Refresh token inválido o expirado.")` cuando el token no es válido, resultando en HTTP 500 (manejable por el `GlobalExceptionHandler` existente).

---

## Frontend (`Smart-Solutions-Front`)

### `.env` — creado
- Se crea `.env` con `VITE_API_URL=https://ap-916a8432b2994023864bb12867d8c2df.ecs.sa-east-1.on.aws`.
- La variable ya estaba en `.env.example` pero nunca se usaba en el código.

### `authApi.js` / `userApi.js` / `locationApi.js` / `paymentApi.js` — URL externalizada
- **Problema:** Las cuatro APIs tenían la `baseUrl` hardcodeada en el código fuente.
- **Fix:** Reemplazado por `import.meta.env.VITE_API_URL` en todos los archivos.

### `plansApi.js` — nuevo archivo
- Integración completa con la Core API para gestión de planes.
- Endpoints cubiertos:
  - `GET /api/v1/plans` — planes activos (público)
  - `GET /api/v1/plans/{id}` — plan por ID
  - `GET /api/v1/plans/admin/all` — todos los planes (admin)
  - `POST /api/v1/plans/create` — crear plan (admin)
  - `PUT /api/v1/plans/{id}` — actualizar plan (admin)

### `subscriptionsApi.js` — nuevo archivo
- Integración completa con la Core API para gestión de suscripciones.
- Endpoints cubiertos:
  - `GET /api/v1/subscriptions/{userId}/subscription` — ver suscripción
  - `POST /api/v1/subscriptions/{userId}/subscription/activate` — activar (admin)
  - `POST /api/v1/subscriptions/{userId}/subscription/cancel` — cancelar renovación

### `store.js` — actualizado
- Se registran `plansApi` y `subscriptionsApi` en el store Redux (reducer + middleware).

### `LoginForm.jsx` / `RegisterForm.jsx` — CSS corregido
- **Problema:** `className="space-y-4 text-white"` en el `<form>` causaba que las etiquetas MUI aparecieran en blanco sobre fondo blanco (invisibles).
- **Fix:** Se elimina `text-white`. Los estilos de texto los gestiona el tema MUI.

### `UsersPanel.jsx` — expandido
- **Antes:** Solo búsqueda por email y teléfono.
- **Ahora:**
  - Búsqueda por email y teléfono (con botones "Editar" y "Suscripción" en cada resultado).
  - Lista completa de usuarios (`GET /api/v1/admin/users`) con chip de rol.
  - Dialog de edición de usuario con campos nombre, apellido, teléfono y correo (`PATCH /api/v1/admin/users/update-by-email/{email}`).
  - Dialog de gestión de suscripción por usuario (ver, activar, cancelar renovación).

### `PlansPanel.jsx` — nuevo archivo
- Panel administrativo completo para planes:
  - Lista todos los planes con estado activo/inactivo.
  - Formulario inline para crear nuevo plan (nombre, precio, duración, descripción, estado).
  - Edición inline de cada plan existente.

### `AdminPage.jsx` — tercer tab añadido
- Se agrega tab **"Planes"** que renderiza `PlansPanel`.
- `maxWidth` ampliado de `768px` a `960px` para acomodar la lista de usuarios y la tabla de planes.
- Tabs con `variant="scrollable"` para pantallas pequeñas.

### `ProfilePage.jsx` — sección "Mi Suscripción" añadida
- Tras cargar el perfil se consulta `GET /api/v1/subscriptions/{userId}/subscription` usando `profile.id`.
- Si existe suscripción: muestra tarjeta con plan, estado (chip), fecha de vencimiento y aviso si la renovación está cancelada.
- Si no existe suscripción: muestra mensaje informativo invitando a contactar al administrador.

---

## Flujo de autenticación verificado

```
Browser → CloudFront → S3 (Frontend SPA)
Browser → CloudFront/ECS → Gateway (8080)
  ↓ JWT válido en cookie "accessToken"
Gateway → Auth ALB (Auth API 8081)   — /api/v1/auth/**, /api/v1/users/**, /api/v1/admin/**
Gateway → Core ALB (Core API)        — /api/v1/plans/**, /api/v1/subscriptions/**
  ↓ Headers inyectados por Gateway
Core API recibe: X-User-Id, X-User-Email, X-User-Role
```

---

## Archivos no modificados (según instrucciones)

- `application.yml` / `application.yaml` de Auth API, Core API y Gateway — sin cambios.
- Configuraciones de seguridad de Core API — sin cambios.
- Lógica de negocio existente — sin cambios, solo correcciones y extensiones.
