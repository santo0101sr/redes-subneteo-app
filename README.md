# Base Web Interactiva (PHP + Vercel): Redes y Subneteo IPv4

Proyecto base educativo generado a partir de las presentaciones:
1. **IPEC Santo Domingo — Subneteo IPv4: Desde Cero**
2. **Cisco Networking Academy — Conceptos Básicos de Redes**

## Estructura del proyecto
- `api/index.php`: Punto de entrada principal en PHP (renderiza la interfaz de módulos: Ruta de aprendizaje, Fundamentos OSI/TCP-IP, Clases IPv4, Binario/CIDR, Laboratorio de Subneteo, Consola Cisco IOS, Prácticas/Evaluación y Diseño de Software).
- `api/health.php`: Endpoint de ejemplo en PHP que devuelve estado y versión de PHP en formato JSON (`/api/health.php`).
- `vercel.json`: Configuración de Vercel para ejecutar archivos `api/*.php` con el runtime `vercel-php@0.9.0` y enrutar `/` hacia `/api/index.php`.
- `css/styles.css`: Estilos base responsivos con variables CSS en `:root` para facilitar el futuro rediseño UX/UI.
- `js/data.js`: Contenidos de capas OSI, prácticas del curso y banco de preguntas.
- `js/interactive.js`: Lógica de simuladores, calculadora paso a paso, terminal Cisco IOS y seguimiento de progreso con `localStorage`.

## Cómo usar
- **En local (con PHP instalado):**
  ```bash
  php -S localhost:8000 api/index.php
  ```
  (Para servir archivos estáticos `/css` y `/js` junto con `/`, ejecuta `php -S localhost:8000` y abre `http://localhost:8000/api/index.php`).
- **En Vercel:** Al hacer `git push` a `main`, Vercel construye y despliega automáticamente usando `vercel.json`.
