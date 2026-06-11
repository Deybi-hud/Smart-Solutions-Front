import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#0a1518", borderTop: "1px solid #1f2937", py: 3, mt: "auto" }}
    >
      <Box sx={{ maxWidth: "576px", mx: "auto", px: 2 }}>
        <Typography variant="body2" sx={{ color: "#6b7280" }}>
          © {new Date().getFullYear()} hola soy un footer:3
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
