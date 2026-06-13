import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderTopColor: "divider",
        py: 3,
        mt: "auto",
      }}
    >
      <Box sx={{ maxWidth: "576px", mx: "auto", px: 2 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          © {new Date().getFullYear()} Smart Solutions
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
