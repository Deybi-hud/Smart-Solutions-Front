import { createTheme } from "@mui/material/styles";

// ─── Paleta principal ───────────────────────────────────────────────────────
// Tonos suaves inspirados en rosa empolvado, salmón y blanco cálido.
// Se usa Material 3 con colores simples y de bajo contraste para un look limpio.
const COLORS = {
  // Fondo base de toda la app (casi blanco con tono rosado muy sutil)
  bgDefault: "#FDF6F4",
  // Fondo de tarjetas y papeles (blanco cálido)
  bgPaper: "#FFFFFF",
  // Color primario: rosa medio, usado en botones y highlights
  primary: "#D4627A",
  // Variante más oscura del primario para hover
  primaryDark: "#B8455E",
  // Acento salmón, para borders decorativos o badges secundarios
  salmon: "#F4A896",
  // Texto principal (gris oscuro cálido, no negro puro)
  textPrimary: "#3D2B2B",
  // Texto secundario / labels / hints (gris rosado)
  textSecondary: "#9C7878",
  // Borde de separadores y divisores
  divider: "#EDD9D5",
  // Fondo de paneles internos (un escalón más oscuro que bgDefault)
  bgPanel: "#FAF0EE",
  // Fondo de filas / chips internos dentro de paneles
  bgRow: "#F5E5E2",
  // Error (rojo suave, no agresivo)
  error: "#C0392B",
};

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: COLORS.primary,           // Botones, tabs activos, links
      dark: COLORS.primaryDark,       // Hover de botones
      contrastText: "#FFFFFF",        // Texto sobre fondo primario
    },

    error: {
      main: COLORS.error,
    },

    background: {
      default: COLORS.bgDefault,      // Fondo general de toda la app
      paper: COLORS.bgPaper,          // Fondo de tarjetas / modales
    },

    text: {
      primary: COLORS.textPrimary,    // Texto de párrafos y títulos
      secondary: COLORS.textSecondary,// Labels, hints, captions
    },

    divider: COLORS.divider,          // Líneas divisorias entre secciones
  },

  typography: {
    fontFamily: "inherit",
    button: {
      textTransform: "none",          // Sin mayúsculas forzadas en botones
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 8,                  // Radio de borde suave para todos los componentes
  },

  components: {
    // ── Botones ─────────────────────────────────────────────────────────────
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        // Variante contained: fondo primario (rosa)
        contained: {
          backgroundColor: COLORS.primary,
          color: "#FFFFFF",
          "&:hover": { backgroundColor: COLORS.primaryDark },
        },
        // Variante outlined: borde rosa, sin relleno
        outlined: {
          borderColor: COLORS.salmon,
          color: COLORS.primary,
          "&:hover": {
            borderColor: COLORS.primary,
            backgroundColor: "#FDF0F0",
          },
        },
      },
    },

    // ── Tarjetas / Papel ────────────────────────────────────────────────────
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: COLORS.bgPaper,
          boxShadow: "0 1px 4px rgba(180,100,100,0.06)",
        },
      },
    },

    // ── Barra de navegación superior ────────────────────────────────────────
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#FFFFFF",                    // Navbar blanca
          borderBottom: `1px solid ${COLORS.divider}`,  // Separador suave
          boxShadow: "none",
        },
      },
    },

    // ── Tabs de navegación interna (ej. AdminPage) ──────────────────────────
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: COLORS.primary }, // Línea activa rosa
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: COLORS.textSecondary,
          "&.Mui-selected": { color: COLORS.primary },  // Tab activo en rosa
        },
      },
    },

    // ── Inputs y TextField ──────────────────────────────────────────────────
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": { borderColor: COLORS.divider },
          "&:hover fieldset": { borderColor: COLORS.salmon },
          "&.Mui-focused fieldset": { borderColor: COLORS.primary },
        },
      },
    },

    // ── Dividers ────────────────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: COLORS.divider },
      },
    },
  },
});

export default theme;

// Exporta los colores para usarlos en sx props de otros componentes
export { COLORS };
