# 📖 Berserk — Lector de manga (mobile-first)

Lector de manga online pensado **mobile-first** para leer **Berserk en español**.
Es un sitio 100% estático (HTML + CSS + JavaScript, sin build) que obtiene los
capítulos y las páginas en tiempo real desde la **API pública de MangaDex**.

## ✨ Características

- **Mobile-first**: diseño en columna, tema oscuro, áreas táctiles y soporte de
  *safe areas* (notch).
- **Lista de capítulos** de Berserk en español, con buscador y orden
  ascendente/descendente.
- **Dos modos de lectura**: scroll vertical continuo (webtoon) o página por
  página (con toque/teclas para avanzar).
- **Progreso guardado** en el navegador: capítulos leídos ✓ y botón
  *Continuar* desde donde lo dejaste.
- **Ajustes**: idioma (es-LA / es / cualquier español), ahorro de datos y modo
  de lectura.
- **PWA**: instalable en el móvil y con *app shell* cacheado por un Service
  Worker para un arranque rápido.

## 🚀 Cómo ejecutarlo

Como usa módulos ES, `fetch` y un Service Worker, debe servirse por HTTP
(no abrir el `index.html` con `file://`). Cualquier servidor estático sirve:

```bash
# Opción 1: Python
python3 -m http.server 8080

# Opción 2: Node
npx serve .
```

Luego abre `http://localhost:8080` (idealmente con las herramientas de
desarrollo en modo móvil).

## 🌐 Despliegue

Al ser estático, se publica en cualquier hosting de sitios estáticos:
**GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**, etc.
Las rutas son relativas, por lo que funciona también en subcarpetas
(p. ej. `usuario.github.io/cdms-manga/`).

## 🗂️ Estructura

```
index.html              # cascarón de la app + panel de ajustes
css/styles.css          # estilos mobile-first (tema oscuro)
js/api.js               # cliente de la API de MangaDex
js/store.js             # preferencias y progreso (localStorage)
js/app.js               # router por hash + vistas (lista y lector)
sw.js                   # Service Worker (cache del app shell)
manifest.webmanifest    # metadatos PWA
icons/                  # iconos de la PWA
```

## ⚖️ Sobre el contenido

La aplicación **no aloja ni distribuye** manga: solo es un lector que consume la
API pública de MangaDex, donde el contenido son *scanlations* subidos por
terceros. Respeta los derechos de autor y las leyes de tu país; para apoyar la
obra, considera comprar las ediciones oficiales de Berserk.

## 🔧 Cambiar de obra

Está centrado en Berserk, pero para leer otra serie basta con cambiar
`BERSERK_ID` en `js/api.js` por el UUID del manga en MangaDex.
