import { createTheme } from "@mui/material/styles";

export const COLORS = {
  bgDefault: "#FDF6F4",
  bgPaper: "#FFFFFF",
  bgPanel: "#FAF0EE",
  bgRow: "#F5E5E2",
  primary: "#D4627A",
  primaryDark: "#B8455E",
  primaryLight: "#F4A896",
  textPrimary: "#3D2B2B",
  textSecondary: "#9C7878",
  divider: "#EDD9D5",
  error: "#C0392B",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: COLORS.primary,
      dark: COLORS.primaryDark,
      light: COLORS.primaryLight,
      contrastText: "#FFFFFF",
    },
    error: { main: COLORS.error },
    success: { main: "#2e7d32" },
    background: { default: COLORS.bgDefault, paper: COLORS.bgPaper },
    text: { primary: COLORS.textPrimary, secondary: COLORS.textSecondary },
    divider: COLORS.divider,
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: "inherit",
    h2: { fontWeight: 700, lineHeight: 1.15 },
    h3: { fontWeight: 700, lineHeight: 1.2 },
    h4: { fontWeight: 700, lineHeight: 1.25 },
    h5: { fontWeight: 700, lineHeight: 1.3 },
    h6: { fontWeight: 600, lineHeight: 1.4 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.5 },
    caption: { lineHeight: 1.4 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.015em" },
  },

  components: {
    // ─── Base ──────────────────────────────────────────────────────
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: COLORS.bgDefault, color: COLORS.textPrimary },
      },
    },

    // ─── Button (MD3: pill shape) ──────────────────────────────────
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: "100px",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        sizeSmall: { padding: "4px 16px", fontSize: "0.8125rem" },
        sizeMedium: { padding: "8px 24px" },
        sizeLarge: { padding: "12px 32px", fontSize: "1rem" },
        contained: {
          backgroundColor: COLORS.primary,
          color: "#FFFFFF",
          "&:hover": { backgroundColor: COLORS.primaryDark },
          "&.Mui-disabled": { backgroundColor: COLORS.divider, color: COLORS.textSecondary },
        },
        outlined: {
          borderColor: COLORS.divider,
          color: COLORS.primary,
          "&:hover": { borderColor: COLORS.primary, backgroundColor: COLORS.bgPanel },
        },
        text: {
          color: COLORS.textSecondary,
          "&:hover": { backgroundColor: COLORS.bgPanel, color: COLORS.textPrimary },
        },
      },
    },

    // ─── Paper ─────────────────────────────────────────────────────
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: "none", backgroundColor: COLORS.bgPaper },
        outlined: { border: `1px solid ${COLORS.divider}`, boxShadow: "none" },
        elevation1: { boxShadow: "0 1px 4px rgba(180,100,100,0.08)" },
      },
    },

    // ─── Card ──────────────────────────────────────────────────────
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: `1px solid ${COLORS.divider}`, borderRadius: "14px", boxShadow: "none" },
      },
    },

    // ─── AppBar ────────────────────────────────────────────────────
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: COLORS.bgPaper,
          borderBottom: `1px solid ${COLORS.divider}`,
          color: COLORS.textPrimary,
        },
      },
    },

    // ─── Tabs ──────────────────────────────────────────────────────
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: COLORS.primary,
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.9375rem",
          color: COLORS.textSecondary,
          minWidth: 0,
          padding: "10px 20px",
          "&.Mui-selected": { color: COLORS.primary, fontWeight: 600 },
        },
      },
    },

    // ─── Text fields ───────────────────────────────────────────────
    MuiTextField: {
      defaultProps: { size: "small", fullWidth: true, variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: COLORS.bgPaper,
          "& fieldset": { borderColor: COLORS.divider },
          "&:hover:not(.Mui-disabled) fieldset": { borderColor: COLORS.primaryLight },
          "&.Mui-focused fieldset": { borderColor: COLORS.primary, borderWidth: "1.5px" },
          "&.Mui-error fieldset": { borderColor: COLORS.error },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: COLORS.textSecondary,
          "&.Mui-focused": { color: COLORS.primary },
          "&.Mui-error": { color: COLORS.error },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 0, marginRight: 0, marginTop: "4px" },
      },
    },

    // ─── Select / Menu ─────────────────────────────────────────────
    MuiSelect: {
      styleOverrides: {
        icon: { color: COLORS.textSecondary },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: COLORS.textPrimary,
          fontSize: "0.9375rem",
          "&:hover": { backgroundColor: COLORS.bgPanel },
          "&.Mui-selected": { backgroundColor: COLORS.bgRow, color: COLORS.primary },
          "&.Mui-selected:hover": { backgroundColor: COLORS.bgRow },
        },
      },
    },

    // ─── Divider ───────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: COLORS.divider },
      },
    },

    // ─── Chip (MD3: tonal) ─────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "8px", fontWeight: 500, fontSize: "0.75rem" },
      },
    },

    // ─── Alert ─────────────────────────────────────────────────────
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: "10px", fontSize: "0.875rem" },
      },
    },

    // ─── Dialog ────────────────────────────────────────────────────
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          border: `1px solid ${COLORS.divider}`,
          boxShadow: "0 8px 32px rgba(61,43,43,0.12)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: COLORS.textPrimary,
          fontWeight: 700,
          fontSize: "1.125rem",
          padding: "20px 24px 8px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: { padding: "8px 24px 16px" },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: { padding: "8px 24px 20px", gap: "8px" },
      },
    },
  },
});

export default theme;
