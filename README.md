# PibesDeBarrio

## Sitio publicado

https://braianruaimi.github.io/pibesdebarrio/

## Texto corto para GitHub About

Landing e-commerce mobile-first de PibesDeBarrio con catalogo destacado, compra directa por WhatsApp, carrito flotante editable, accesos a comunidad y soporte PWA.

## Descripcion

PibesDeBarrio es una landing e-commerce mobile-first creada con Next.js, TypeScript y Tailwind CSS.
El proyecto esta pensado para mostrar productos streetwear, permitir compra directa por WhatsApp, ofrecer un carrito editable y sumar accesos rapidos a comunidad, Instagram y un asistente de preguntas frecuentes.

## Funcionalidades principales

- Hero principal con marca PibesDeBarrio y accesos destacados.
- Catalogo principal de productos.
- Panel de catalogo destacado limitado a 3 productos administrables desde datos.
- Compra directa por WhatsApp desde cada tarjeta de producto.
- Carrito flotante editable con cantidades, subtotal por item y total final.
- Botones flotantes de WhatsApp y Asistente Pibes.
- FAQ predeterminadas para responder consultas frecuentes.
- Link directo al canal de comunidad y al perfil de Instagram.
- Soporte PWA basico con boton de instalar app y boton de actualizar cuando haya nueva version disponible.
- Publicacion automatizable en GitHub Pages mediante rama gh-pages.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- gh-pages para deploy a GitHub Pages

## Estructura del proyecto

- pages: paginas principales de la app.
- components: componentes visuales y bloques reutilizables.
- data: productos destacados, catalogo y preguntas frecuentes.
- services: integracion con WhatsApp.
- utils: helpers de moneda y carrito.
- public: manifiesto PWA, service worker e iconos.
- scripts: automatizaciones de despliegue.
- styles: estilos globales y clases reutilizables.

## Archivos clave

- pages/index.tsx: composicion principal de la landing.
- components/ProductCard.tsx: tarjeta de producto con CTA de WhatsApp y agregar al carrito.
- components/CartSummary.tsx: carrito flotante editable.
- components/FloatingActions.tsx: botones flotantes y asistente.
- components/PwaControls.tsx: boton instalar app y actualizar app.
- data/products.ts: catalogo principal y productos destacados.
- data/faqs.ts: preguntas frecuentes del asistente.
- services/whatsapp.ts: mensajes y links de WhatsApp.
- scripts/deploy-gh-pages.mjs: publicacion a gh-pages.
- next.config.js: configuracion para export estatico y GitHub Pages.

## Como editar contenido rapido

### Productos principales

Edita el array products en data/products.ts.

### Productos destacados del panel Catalogo

Edita featuredProductIds en data/products.ts.
Esa lista define que 3 productos aparecen en el panel destacado.

### Preguntas frecuentes del asistente

Edita el array faqs en data/faqs.ts.

## Desarrollo local

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar entorno local:

```bash
npm run dev
```

3. Abrir en el navegador:

```text
http://localhost:3000
```

## Build de produccion

```bash
npm run build
```

## Deploy a GitHub Pages

El proyecto esta configurado para export estatico y publicar en la rama gh-pages.

```bash
npm run deploy:gh-pages
```

## PWA

La app incluye:

- manifest.webmanifest
- service worker basico
- iconos de app
- boton de instalar cuando el navegador lo permite
- boton de actualizar cuando hay una nueva version disponible

Nota: el boton Instalar app depende del navegador y de que la app cumpla las condiciones de instalacion del entorno.

## Notas de mantenimiento

- El sitio publicado usa GitHub Pages con basePath /pibesdebarrio.
- El proyecto compila como export estatico.
- npm audit todavia puede reportar advisories de Next que requieren una actualizacion mayor para resolverse por completo.

## Autor

Proyecto desarrollado para PibesDeBarrio.