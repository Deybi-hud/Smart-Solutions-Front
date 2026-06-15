import { createTheme } from "@mui/material/styles";

export const COLORS = {
  bgDefault: "#EEE9DF",
  bgPaper:   "#E5DFD3",
  bgPanel:   "#C9C1B1",
  bgRow:     "#B8B0A1",
  primary:     "#FFB162",
  primaryDark: "#A35139",
  primaryLight:"#FFC98A",
  navy:     "#2C3B4D",
  navyDark: "#1B2632",
  textPrimary:   "#1B2632",
  textSecondary: "#2C3B4D",
  divider: "#C9C1B1",
  error:   "#A35139",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main:          COLORS.primary,
      dark:          COLORS.primaryDark,
      light:         COLORS.primaryLight,
      contrastText:  COLORS.navyDark,
    },
    error:   { main: COLORS.error },
    success: { main: "#2e7d32" },
    background: { default: COLORS.bgDefault, paper: COLORS.bgPaper },
    text: { primary: COLORS.textPrimary, secondary: COLORS.textSecondary },
    divider: COLORS.divider,
  },

  shape: { borderRadius: 6 },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Inter', sans-serif", fontWeight: 700, lineHeight: 1.1 },
    h2: { fontFamily: "'Inter', sans-serif", fontWeight: 700, lineHeight: 1.15 },
    h3: { fontFamily: "'Inter', sans-serif", fontWeight: 700, lineHeight: 1.2 },
    h4: { fontFamily: "'Inter', sans-serif", fontWeight: 700, lineHeight: 1.25 },
    h5: { fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1.3 },
    h6: { fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1.4 },
    body1:   { fontFamily: "'Inter', sans-serif", lineHeight: 1.6 },
    body2:   { fontFamily: "'Inter', sans-serif", lineHeight: 1.5 },
    caption: { fontFamily: "'Inter', sans-serif", lineHeight: 1.4 },
    button:  { fontFamily: "'Inter', sans-serif", textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: COLORS.bgDefault, color: COLORS.textPrimary },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: "4px",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        sizeSmall:  { padding: "4px 16px", fontSize: "0.8125rem" },
        sizeMedium: { padding: "8px 24px" },
        sizeLarge:  { padding: "12px 32px", fontSize: "1rem" },
        contained: {
          backgroundColor: COLORS.primary,
          color: COLORS.navyDark,
          "&:hover": { backgroundColor: COLORS.primaryDark, color: "#FFFFFF" },
          "&.Mui-disabled": { backgroundColor: COLORS.bgPanel, color: COLORS.textSecondary },
        },
        outlined: {
          borderColor: COLORS.navy,
          color: COLORS.navy,
          "&:hover": { borderColor: COLORS.navyDark, backgroundColor: COLORS.bgPanel, color: COLORS.navyDark },
        },
        text: {
          color: COLORS.textSecondary,
          "&:hover": { backgroundColor: COLORS.bgPanel, color: COLORS.textPrimary },
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root:      { backgroundImage: "none", backgroundColor: "#FFFFFF" },
        outlined:  { border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
        elevation1:{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
      },
    },

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

    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: COLORS.primary, height: 3, borderRadius: "3px 3px 0 0" },
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

    MuiTextField: {
      defaultProps: { size: "small", fullWidth: true, variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          "& fieldset": { borderColor: COLORS.divider },
          "&:hover:not(.Mui-disabled) fieldset": { borderColor: COLORS.navy },
          "&.Mui-focused fieldset": { borderColor: COLORS.primary, borderWidth: "1.5px" },
          "&.Mui-error fieldset": { borderColor: COLORS.error },
          "&.Mui-disabled": {
            backgroundColor: "#F5F4F1",
            "& fieldset": { borderColor: "#E0DED9 !important" },
          },
          "& .MuiOutlinedInput-input.Mui-disabled": {
            WebkitTextFillColor: COLORS.textSecondary,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: COLORS.textSecondary,
          "&.Mui-focused": { color: COLORS.navy },
          "&.Mui-error": { color: COLORS.error },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 0, marginRight: 0, marginTop: "4px" },
      },
    },

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
          "&.Mui-selected": { backgroundColor: COLORS.bgRow, color: COLORS.navyDark },
          "&.Mui-selected:hover": { backgroundColor: COLORS.bgRow },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: COLORS.divider },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "4px", fontWeight: 500, fontSize: "0.75rem" },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: "6px", fontSize: "0.875rem" },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
          border: `1px solid ${COLORS.divider}`,
          boxShadow: "0 8px 32px rgba(27,38,50,0.15)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { color: COLORS.textPrimary, fontWeight: 700, fontSize: "1.125rem", padding: "20px 24px 8px" },
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
