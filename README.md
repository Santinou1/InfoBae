# 📰 InfoPosts - Plataforma de Gestión de Posts

Una aplicación web moderna y responsive para explorar, filtrar y gestionar posts de usuarios, con sistema de favoritos integrado y autenticación con Google OAuth 2.0.

![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 🌟 Características Principales

### Frontend
- ✅ **Exploración de Posts** - Visualiza posts de múltiples usuarios con imágenes y tags
- ✅ **Sistema de Usuarios** - Explora perfiles de usuarios y sus publicaciones
- ✅ **Filtrado por Tags** - Busca y filtra posts por etiquetas con typeahead
- ✅ **Ordenamiento Inteligente** - Ordena por más comentados, likes o recientes
- ✅ **Paginación** - Navegación eficiente entre páginas de contenido
- ✅ **Sistema de Favoritos** - Guarda tus posts favoritos (requiere autenticación)
- ✅ **Autenticación Google OAuth 2.0** - Login seguro con tu cuenta de Google
- ✅ **Diseño Responsive** - Funciona perfectamente en desktop, tablet y móvil
- ✅ **Modales Interactivos** - Visualiza detalles completos de posts y usuarios
- ✅ **Comentarios** - Lee comentarios de cada post

### Backend
- ✅ **API RESTful** - Endpoints para gestión de favoritos
- ✅ **MongoDB Atlas** - Base de datos en la nube
- ✅ **Autenticación JWT** - Verificación de tokens de Google
- ✅ **CORS Configurado** - Permite peticiones desde el frontend
- ✅ **Persistencia de Datos** - Favoritos guardados por usuario

## 🏗️ Arquitectura del Proyecto

### Frontend (React + Vite)

```
Infobae/
├── src/
│   ├── api/                    # Configuración y servicios de API
│   │   ├── client.js          # Cliente HTTP base
│   │   ├── config.js          # URLs y configuración
│   │   ├── endpoints/         # Definición de endpoints
│   │   └── services/          # Servicios de API
│   │       ├── postService.js
│   │       ├── userService.js
│   │       ├── commentService.js
│   │       ├── tagService.js
│   │       └── favoritesService.js  # ⭐ Servicio de favoritos
│   │
│   ├── components/            # Componentes React
│   │   ├── auth/             # Autenticación
│   │   │   ├── LoginPage/
│   │   │   └── ProtectedRoute/
│   │   ├── common/           # Componentes reutilizables
│   │   │   ├── Modal/
│   │   │   ├── Pagination/
│   │   │   ├── EmptyState/
│   │   │   ├── Skeleton/
│   │   │   ├── TagSidebar/
│   │   │   ├── SortFilter/
│   │   │   └── FavoriteButton/  # ⭐ Botón de favoritos
│   │   ├── posts/            # Posts
│   │   │   ├── PostCard/
│   │   │   ├── PostGrid/
│   │   │   └── PostDetail/
│   │   ├── users/            # Usuarios
│   │   │   ├── UserCard/
│   │   │   ├── UserGrid/
│   │   │   └── UserDetail/
│   │   ├── comments/         # Comentarios
│   │   │   ├── CommentCard/
│   │   │   └── CommentList/
│   │   └── layout/           # Layout
│   │       └── Header/
│   │
│   ├── context/              # Context API
│   │   └── AuthContext.jsx  # ⭐ Contexto de autenticación
│   │
│   ├── hooks/                # Custom Hooks
│   │   ├── usePosts.js
│   │   ├── useUsers.js
│   │   ├── useTags.js
│   │   ├── useComments.js
│   │   └── useFavorites.js  # ⭐ Hook de favoritos
│   │
│   ├── pages/                # Páginas
│   │   ├── HomePage.jsx
│   │   ├── UsersPage.jsx
│   │   └── FavoritesPage.jsx  # ⭐ Página de favoritos
│   │
│   ├── utils/                # Utilidades
│   │   └── sortPosts.js
│   │
│   └── constants/            # Constantes
│       ├── routes.js
│       └── assets.js
│
├── .env                      # Variables de entorno
└── package.json
```

### Backend (Node.js + Express + MongoDB)

```
Infobae-Back/
├── src/
│   ├── config/
│   │   └── database.js       # Conexión a MongoDB
│   │
│   ├── models/
│   │   └── User.js           # Modelo de usuario con favoritos
│   │
│   ├── middleware/
│   │   └── auth.js           # Verificación de tokens JWT
│   │
│   ├── controllers/
│   │   └── favoritesController.js  # Lógica de favoritos
│   │
│   ├── routes/
│   │   └── favorites.js      # Rutas de favoritos
│   │
│   └── server.js             # Servidor Express
│
├── .env                      # Variables de entorno
└── package.json
```

## 🔗 Integración Frontend-Backend

### Flujo de Autenticación

```
1. Usuario → Click "Iniciar sesión con Google"
2. Google OAuth → Devuelve token JWT
3. Frontend → Guarda token en localStorage
4. Frontend → Incluye token en cada petición al backend
5. Backend → Verifica token con Google
6. Backend → Procesa petición si token es válido
```

### Flujo de Favoritos

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│  Frontend   │         │   Backend    │         │   MongoDB    │
│   (React)   │         │  (Express)   │         │   (Atlas)    │
└──────┬──────┘         └──────┬───────┘         └──────┬───────┘
       │                       │                        │
       │ 1. Click ❤️           │                        │
       │ POST /api/favorites   │                        │
       │ + Google Token        │                        │
       ├──────────────────────>│                        │
       │                       │                        │
       │                       │ 2. Verifica Token      │
       │                       │    con Google          │
       │                       │                        │
       │                       │ 3. Guarda Favorito     │
       │                       ├───────────────────────>│
       │                       │                        │
       │                       │ 4. Confirma Guardado   │
       │                       │<───────────────────────┤
       │                       │                        │
       │ 5. Respuesta          │                        │
       │    { success: true }  │                        │
       │<──────────────────────┤                        │
       │                       │                        │
       │ 6. Actualiza UI       │                        │
       │    (❤️ rojo)          │                        │
       │                       │                        │
```

### Endpoints del Backend

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/` | Info del API | No |
| GET | `/api/favorites` | Obtener favoritos del usuario | Sí |
| POST | `/api/favorites` | Agregar post a favoritos | Sí |
| DELETE | `/api/favorites/:postId` | Eliminar post de favoritos | Sí |
| GET | `/api/favorites/check/:postId` | Verificar si es favorito | Sí |

### Ejemplo de Petición

```javascript
// Agregar a favoritos
const response = await fetch('http://localhost:3454/api/favorites', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${googleToken}`
  },
  body: JSON.stringify({ postId: '123abc' })
});

const data = await response.json();
// { success: true, favorites: [...] }
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.x o superior
- npm o yarn
- Cuenta de Google Cloud (para OAuth)
- Cuenta de MongoDB Atlas

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd Infobae
```

### 2. Configurar Frontend

```bash
# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

**Configurar `.env`:**
```env
VITE_DUMMY_BASE_URL=https://dummyapi.io/data/v1
VITE_DUMMY_APP_ID=tu_app_id_de_dummyapi
VITE_GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
VITE_BACKEND_URL=http://localhost:3454
```

### 3. Configurar Backend

```bash
# Ir a la carpeta del backend
cd ../Infobae-Back

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

**Configurar `.env`:**
```env
PORT=3454
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=Infoabe
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
```

### 4. Iniciar Aplicación

**Terminal 1 - Backend:**
```bash
cd Infobae-Back
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Infobae
npm run dev
```

La aplicación estará disponible en:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3454`

## 🔐 Configuración de Google OAuth

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto
3. Habilita "Google+ API"

### 2. Configurar OAuth 2.0

1. Ve a "Credenciales"
2. Crear credenciales → ID de cliente de OAuth 2.0
3. Tipo de aplicación: Aplicación web
4. Orígenes autorizados:
   - `http://localhost:5173`
   - Tu dominio de producción
5. Copia el Client ID

### 3. Configurar en la Aplicación

Agrega el Client ID en:
- Frontend: `VITE_GOOGLE_CLIENT_ID`
- Backend: `GOOGLE_CLIENT_ID`

## 📊 Modelo de Datos

### Usuario (MongoDB)

```javascript
{
  _id: ObjectId,
  googleId: String,        // ID único de Google
  email: String,           // Email del usuario
  name: String,            // Nombre completo
  picture: String,         // URL de foto de perfil
  favorites: [             // Array de favoritos
    {
      postId: String,      // ID del post
      addedAt: Date        // Fecha de agregado
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **React OAuth Google** - Autenticación con Google
- **JWT Decode** - Decodificación de tokens
- **CSS3** - Estilos (sin frameworks)

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Google Auth Library** - Verificación de tokens
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno

### APIs Externas
- **DummyAPI** - Posts, usuarios, comentarios y tags
- **Google OAuth 2.0** - Autenticación

## 📱 Responsive Design

La aplicación es completamente responsive con breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile Large**: 480px - 768px
- **Mobile Small**: 360px - 480px
- **Very Small**: < 360px

## 🧪 Testing

### Probar Favoritos

1. Inicia sesión con Google
2. Navega a la página de Posts
3. Click en el corazón blanco (🤍) de un post
4. El corazón se vuelve rojo (❤️)
5. Ve a "❤️ Favoritos" en el menú
6. Verás el post guardado

### Verificar Backend

```bash
# Verificar que el backend está corriendo
curl http://localhost:3454

# Debería responder:
# { "message": "🚀 InfoPosts API - Backend funcionando correctamente" }
```

## 🐛 Solución de Problemas

### Error: CORS

**Problema:** `Access to fetch has been blocked by CORS policy`

**Solución:**
1. Verifica que el backend esté corriendo
2. Verifica que `VITE_BACKEND_URL` no tenga barra al final
3. Verifica que el backend tenga CORS configurado

### Error: Token Inválido

**Problema:** `401 Unauthorized`

**Solución:**
1. Verifica que hayas iniciado sesión
2. Verifica que el token esté en localStorage
3. Verifica que el `GOOGLE_CLIENT_ID` sea el mismo en frontend y backend

### Error: MongoDB Connection

**Problema:** `Error conectando a MongoDB`

**Solución:**
1. Verifica que `MONGODB_URI` sea correcta
2. Verifica que tu IP esté permitida en MongoDB Atlas
3. En MongoDB Atlas → Network Access → Allow Access from Anywhere



## 🚀 Despliegue

### Frontend (GitHub Pages)

Ver la guía completa paso a paso: **[DEPLOYMENT_GITHUB.md](./DEPLOYMENT_GITHUB.md)**

**Resumen rápido:**
1. Sube el código a GitHub
2. Configura los secrets en GitHub (Settings → Secrets)
3. Habilita GitHub Pages (Settings → Pages → Source: GitHub Actions)
4. Agrega la URL de GitHub Pages a Google OAuth
5. Haz push y se desplegará automáticamente

```bash
# Build local
npm run build

# La carpeta dist/ contiene los archivos estáticos
```

### Backend (Render)

Ver [README.md](../Infobae-Back/README.md) en el repositorio del backend.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autores

- **Santino Ursino** - Desarrollo completo

## Se uso

- DummyAPI por proporcionar la API de datos
- Google por el sistema de autenticación OAuth 2.0
- MongoDB Atlas por la base de datos en la nube

---


