# Smart Solutions - Frontend

Aplicación frontend de Smart Solutions desarrollada con React y Vite.

## Descripción

Frontend moderno y eficiente para la plataforma Smart Solutions, utilizando tecnologías de última generación para garantizar un rendimiento óptimo y una experiencia de usuario superior.

## Stack Tecnológico

- **React** - Librería de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **TypeScript** - Tipado estático (recomendado)
- **ESLint** - Linter de código

## Requisitos Previos

- Node.js v16 o superior
- npm o yarn

## Instalación

```bash
# Clonar el repositorio
git clone <url-repositorio>

# Instalar dependencias
npm install

# Alternativamente con yarn
yarn install
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo con HMR
npm run dev

# O con yarn
yarn dev
```

El servidor se ejecutará en `http://localhost:5173` con recarga en caliente habilitada.

## Compilación

```bash
# Generar build de producción
npm run build

# Vista previa del build
npm run preview
```

## Configuración de Calidad

### ESLint

Se incluyen reglas de linting predefinidas. Para proyectos en producción, se recomienda utilizar TypeScript con reglas de análisis de tipos.

### Opciones de Plugins

Actualmente disponibles dos opciones de plugins oficiales:

- `@vitejs/plugin-react` - Usa Oxc para mejor rendimiento
- `@vitejs/plugin-react-swc` - Usa SWC como alternativa

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
  └── App.tsx        # Componente principal
```

## Contribución

Sigue las pautas de codificación del proyecto y asegúrate de que el linting sea válido antes de hacer commits.

## Licencia

Todos los derechos reservados.
