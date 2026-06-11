import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    // Footer: franja inferior de todas las páginas
    // Fondo blanco con borde superior rosa pálido para separar del contenido
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #EDD9D5",   // Divisor salmón suave
        py: 3,
        mt: "auto",
      }}
    >
      <Box sx={{ maxWidth: "576px", mx: "auto", px: 2 }}>
        {/* Texto de copyright en gris rosado */}
        <Typography variant="body2" sx={{ color: "#9C7878" }}>
          © {new Date().getFullYear()} Smart Solutions
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
