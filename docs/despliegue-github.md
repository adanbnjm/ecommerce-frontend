# Publicación desde feat/custom-hooks

La configuración está solo en la rama de hooks. No se hace merge a main automáticamente.

## Para el propietario del repositorio

1. Abrir Settings > Pages y seleccionar GitHub Actions como origen de publicación.
2. Si el entorno github-pages restringe las ramas, permitir feat/custom-hooks en Settings > Environments > github-pages > Deployment branches.
3. Abrir Actions > Web y reporte desde la rama de hooks, entrar a la última ejecución y elegir Re-run all jobs.
4. Esperar a que el job deploy termine correctamente. Su enlace es la URL definitiva de la web.

La URL esperada, cuando se active el despliegue, es:
https://adanbnjm.github.io/ecommerce-frontend/

El reporte estará en reporte-hooks.html y reporte-hooks.pdf dentro de esa web.

Mientras Pages no esté activado, el job deploy se omite. El job build deja un artefacto llamado web-abarrotes-hooks, con la web compilada y el reporte. Eso confirma la compilación, no una publicación.

El workflow usa la ruta base /ecommerce-frontend/. La app usa rutas con # en Pages para poder recargar el catálogo o el carrito sin errores 404. Localmente conserva BrowserRouter.

Referencia: https://vite.dev/guide/static-deploy.html#github-pages
