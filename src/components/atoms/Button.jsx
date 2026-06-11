import MuiButton from "@mui/material/Button";

// Botón base de la app — variante contained con estilo propio
// Los colores (rosa primario, hover oscuro) vienen del theme.js
const Button = ({ children, type = "button", disabled = false, onClick, ...props }) => {
  return (
    <MuiButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      fullWidth
      // Sobreescritura puntual: botón blanco para casos donde se usa como acción secundaria
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#D4627A",                                    // Texto rosa primario
        border: "1px solid #EDD9D5",                         // Borde divisor suave
        boxShadow: "none",
        "&:hover": { backgroundColor: "#FDF6F4", boxShadow: "none" },
        "&.Mui-disabled": { backgroundColor: "#FFFFFF", opacity: 0.6, color: "#D4627A" },
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
