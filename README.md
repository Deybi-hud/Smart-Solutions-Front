# Smart Solutions - Frontend

Aplicación frontend de Smart Solutions desarrollada con React y Vite.

## Descripción

Frontend moderno y eficiente para la plataforma Smart Solutions, utilizando tecnologías de última generación para garantizar un rendimiento óptimo y una experiencia de usuario superior.

## Stack Tecnológico

- **React** - Librería de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **ESLint** - Linter de código
- **Amazon S3** - Almacenamiento de archivos estáticos
- **CloudFront** - CDN para distribución de contenido

## Requisitos Previos

- Node.js v16 o superior
- npm

## Instalación

```bash
# Clonar el repositorio
git clone <url-repositorio>

# Instalar dependencias
npm ci
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo con HMR
npm run dev
```

El servidor se ejecutará en `d1cvogky5serqv.cloudfront.net/` 

## Compilación

```bash
# Generar build de producción
npm run build

# Vista previa del build
npm run preview
```

## Configuración de Calidad

### ESLint

Se incluyen reglas de linting predefinidas para mantener la calidad del código.

## Despliegue

El frontend se despliega automáticamente en **Amazon S3** con distribución a través de **CloudFront**, garantizando una entrega rápida y confiable del contenido a nivel global.

## Notas

- React Compiler no está habilitado por defecto debido a su impacto en rendimiento de desarrollo y compilación
- Para habilitar React Compiler, consulta la [documentación oficial](https://react.dev/learn/react-compiler/installation)

## Estructura del Proyecto

```
src/
  ├── components/     # Componentes reutilizables
  ├── pages/         # Páginas principales
  ├── hooks/         # Hooks personalizados
  ├── services/      # Servicios y API calls
  ├── utils/         # Utilidades
  ├── styles/        # Estilos globales
  └── App.jsx        # Componente principal
```

## Contribución

Sigue las pautas de codificación del proyecto y asegúrate de que el linting sea válido antes de hacer commits.
