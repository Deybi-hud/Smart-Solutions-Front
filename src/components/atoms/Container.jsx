import Box from "@mui/material/Box";

const sizeMap = {
  sm: "384px",
  md: "448px",
  lg: "512px",
  xl: "576px",
  full: "100%",
};

const Container = ({ children, className, size = "md" }) => {
  return (
    <Box
      className={className}
      sx={{
        width: "100%",
        maxWidth: sizeMap[size],
        mx: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
