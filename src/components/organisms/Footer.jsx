import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #EDD9D5",
        py: 3,
        mt: "auto",
      }}
    >
      <Box sx={{ maxWidth: "576px", mx: "auto", px: 2 }}>
        <Typography variant="body2" sx={{ color: "#9C7878" }}>
          © {new Date().getFullYear()} Smart Solutions
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
