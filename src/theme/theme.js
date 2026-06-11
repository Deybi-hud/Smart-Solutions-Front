import { createTheme } from "@mui/material/styles";

const COLORS = {
  bgDefault: "#FDF6F4",
  bgPaper: "#FFFFFF",
  primary: "#D4627A",
  primaryDark: "#B8455E",
  salmon: "#F4A896",
  textPrimary: "#3D2B2B",
  textSecondary: "#9C7878",
  divider: "#EDD9D5",
  bgPanel: "#FAF0EE",
  bgRow: "#F5E5E2",
  error: "#C0392B",
};

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: COLORS.primary,
      dark: COLORS.primaryDark,
      contrastText: "#FFFFFF",
    },

    error: {
      main: COLORS.error,
    },

    background: {
      default: COLORS.bgDefault,
      paper: COLORS.bgPaper,
    },

    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },

    divider: COLORS.divider,
  },

  typography: {
    fontFamily: "inherit",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        contained: {
          backgroundColor: COLORS.primary,
          color: "#FFFFFF",
          "&:hover": { backgroundColor: COLORS.primaryDark },
        },
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

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: COLORS.bgPaper,
          boxShadow: "0 1px 4px rgba(180,100,100,0.06)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#FFFFFF",
          borderBottom: `1px solid ${COLORS.divider}`,
          boxShadow: "none",
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: COLORS.primary },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: COLORS.textSecondary,
          "&.Mui-selected": { color: COLORS.primary },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": { borderColor: COLORS.divider },
          "&:hover fieldset": { borderColor: COLORS.salmon },
          "&.Mui-focused fieldset": { borderColor: COLORS.primary },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: COLORS.divider },
      },
    },
  },
});

export default theme;

export { COLORS };
