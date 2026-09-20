# El CiD — Frontend (Next.js)

Frontend del chiringuito El CiD, hecho con **Next.js (App Router) + Tailwind CSS**.
Consume la API de `chiringuito_back` para mostrar los conciertos.

## Requisitos

- Tener `chiringuito_back` corriendo en `http://localhost:3000`
  (o la URL que pongas en `.env.local`).

## Instalación

```bash
npm install
cp .env.local.example .env.local
```

Edita `.env.local` si tu backend corre en otra URL/puerto.

## Levantar en desarrollo

```bash
npm run dev
```

El frontend corre en **http://localhost:3001** (puerto distinto al backend,
que ya usa el 3000).

## Estructura

```
app/
  layout.js            # Fuentes (Fraunces + Inter), Header y Footer globales
  page.js              # Página de Inicio
  conciertos/page.js   # Página de Conciertos (trae datos del backend)
  admin/page.js        # Panel de Administración (crear/editar/eliminar conciertos)
components/
  Header.js
  Footer.js
  ConciertoCard.js         # Tarjeta de la grilla "Próximos Eventos"
  DestacadosCarousel.js    # Carrusel de conciertos destacados
  admin/
    AdminConciertoRow.js       # Fila de la lista en el panel
    ConciertoFormModal.js      # Modal de crear/editar concierto
    DeleteConfirmModal.js      # Modal de confirmación de borrado
```

## Panel de Administración (`/admin`)

Está protegido con **login + cookie httpOnly**:

1. `/login` — formulario de acceso. Llama a `/api/auth/login` (ruta interna
   de Next.js), que a su vez llama a tu backend, y guarda el JWT recibido en
   una cookie `httpOnly` (invisible para JavaScript del navegador).
2. `middleware.js` protege cualquier ruta bajo `/admin`: en cada visita,
   le pregunta al backend (`GET /api/auth/me`) si el token de la cookie
   sigue siendo válido. Si no lo es (o no hay cookie), redirige a `/login`.
   Así no hace falta duplicar el `JWT_SECRET` en el frontend — el backend
   es la única fuente de verdad sobre qué token es válido.
3. Crear/editar/eliminar conciertos pasa por rutas internas
   (`/api/conciertos`, `/api/conciertos/[id]`) que leen la cookie en el
   servidor y la reenvían al backend como `Authorization: Bearer <token>`.
   El backend ahora **exige** ese token (y que el usuario sea admin) para
   esas operaciones.

El formulario pide la **URL de la imagen** directamente (no sube archivos),
así que puedes usar cualquier URL de imagen pública, o subir la imagen antes
a Cloudinary/Imgur/etc. y pegar aquí el link resultante.

## Notas

- Las imágenes de fondo (playa, comida, cerveza, conciertos) son de
  Unsplash como placeholder — reemplázalas por fotos reales del local
  cuando las tengas, subiéndolas a `public/` y actualizando los `src`
  de cada `<Image>`.
- Los conciertos que crees desde el backend (con imagen subida a
  Cloudinary) aparecerán automáticamente aquí, tanto en destacados
  como en la grilla general.
- Si un concierto no tiene imagen, se usa una foto de concierto
  genérica como respaldo.
