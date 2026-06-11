import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#2563eb", contrastText: "#ffffff" },
    error: { main: "#ef4444" },
    background: { default: "#030712", paper: "#111827" },
    text: { primary: "#f9fafb", secondary: "#9ca3af" },
    divider: "#1f2937",
  },
  typography: {
    fontFamily: "inherit",
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#111827",
          borderBottom: "1px solid #1f2937",
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: { indicator: { backgroundColor: "#3b82f6" } },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "#9ca3af",
          "&.Mui-selected": { color: "#60a5fa" },
        },
      },
    },
  },
});

export default theme;
