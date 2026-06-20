# ☕ Cafetera — Recetario de café (mobile-first)

Recetario de café pensado **mobile-first**: primero eliges el **método de
extracción** y luego ves un recetario con recetas para prepararlo paso a paso,
con **temporizador guiado** incluido.

Es un sitio **100% estático** (HTML + CSS + JavaScript, sin build ni red en
tiempo de ejecución), así que funciona offline una vez cargado.

## ✨ Características

- **Selección por método**: V60, AeroPress, prensa francesa, Chemex, cafetera
  italiana (moka), espresso y cold brew.
- **Fichas de receta** con café/agua, ratio, molienda, temperatura, tiempo y
  dificultad.
- **Temporizador paso a paso**: cuenta el tiempo, resalta el paso actual y avisa
  (sonido + vibración) en cada cambio de fase del vertido.
- **Favoritos** guardados en el navegador (★).
- **Mobile-first**: tema cálido oscuro, soporte de *safe areas* (notch) y
  navegación por toques.
- **PWA**: instalable y con *app shell* cacheado por un Service Worker.

## 📚 Sobre las recetas

Las recetas están **recopiladas y adaptadas de técnicas ampliamente difundidas**
en el mundo del café (p. ej. el *Ultimate V60* y la prensa francesa de **James
Hoffmann**, el método **4:6 de Tetsu Kasuya**, y técnicas tradicionales de moka,
espresso y cold brew). Las cantidades son orientativas: ajusta molienda, dosis y
tiempos a tu gusto y a tu equipo.

## 🚀 Cómo ejecutarlo

Usa módulos ES y un Service Worker, así que debe servirse por HTTP
(no `file://`):

```bash
python3 -m http.server 8080   # luego abre http://localhost:8080
```

## 🌐 Despliegue

Estático: se publica tal cual en **GitHub Pages**, **Netlify**, **Vercel** o
**Cloudflare Pages**. Las rutas son relativas, por lo que funciona también en
subcarpetas (p. ej. `usuario.github.io/cdms-manga/`).

## 🗂️ Estructura

```
index.html              # cascarón de la app
css/styles.css          # estilos mobile-first (tema café)
js/data.js              # métodos de extracción y recetas
js/store.js             # favoritos y último método (localStorage)
js/app.js               # router por hash + vistas + temporizador
sw.js                   # Service Worker (cache offline)
manifest.webmanifest    # metadatos PWA
icons/                  # iconos de la PWA
```

## ➕ Añadir recetas o métodos

Edita `js/data.js`: añade entradas a `METHODS` y a `RECIPES`. Cada receta define
sus `steps` con un `at` en segundos, que el temporizador usa para guiarte.
