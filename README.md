# InfoPosts - Blog con React

**Prueba Técnica - Desarrollador React**  
**Autor:** Santino Ursino | **Fecha:** 29/01/2026

## Descripción

Aplicación web de blog desarrollada como prueba técnica utilizando DummyAPI. Implementa visualización de posts, filtrado por tags, autenticación con Google OAuth 2.0, y sistema de favoritos con persistencia en MongoDB.

## Requisitos Implementados

- Vista de posts con imagen, tags y autor
- Comentarios en modal al hacer clic en post
- Filtrado dinámico por tags
- Vista protegida con Google Sign-In para listar usuarios
- Persistencia de favoritos en MongoDB Atlas
- Diseño responsive (desktop, tablet, móvil)

## Tecnologías

**Frontend:** React 18, Vite 5, React Router DOM, React OAuth Google, CSS3  
**Backend:** Node.js 18, Express 4, MongoDB Atlas, Mongoose, Google Auth Library  
**APIs:** DummyAPI, Google OAuth 2.0

## Instalación

### Frontend
```bash
npm install
# Configurar .env con VITE_DUMMY_BASE_URL, VITE_DUMMY_APP_ID, VITE_GOOGLE_CLIENT_ID, VITE_BACKEND_URL
npm run dev
```

### Backend
```bash
cd Infobae-Back
npm install
# Configurar .env con PORT, MONGODB_URI, GOOGLE_CLIENT_ID
npm run dev
```

## Estructura

```
Infobae/
├── src/
│   ├── api/              # Servicios y configuración API
│   ├── components/       # Componentes React
│   ├── context/          # AuthContext
│   ├── hooks/            # Custom hooks
│   ├── pages/            # HomePage, UsersPage, FavoritesPage
│   └── utils/            # Utilidades
└── package.json

Infobae-Back/
├── src/
│   ├── config/           # Conexión MongoDB
│   ├── models/           # Modelo User
│   ├── middleware/       # Autenticación
│   ├── controllers/      # Lógica favoritos
│   ├── routes/           # Rutas API
│   └── server.js
└── package.json
```

## API Endpoints

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/favorites` | Obtener favoritos | Sí |
| POST | `/api/favorites` | Agregar favorito | Sí |
| DELETE | `/api/favorites/:postId` | Eliminar favorito | Sí |
| GET | `/api/favorites/check/:postId` | Verificar favorito | Sí |

## Despliegue

**Frontend:** GitHub Pages - https://santinou1.github.io/InfoBae/  
**Backend:** Render  
**Base de datos:** MongoDB Atlas



## Repositorio

https://github.com/Santinou1/InfoBae

## Licencia


