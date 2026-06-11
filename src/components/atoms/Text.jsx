import Typography from "@mui/material/Typography";

const variantMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "body1",
  span: "body2",
};

function Text({ children, variant = "p", className }) {
  const muiVariant = variantMap[variant] || "body1";
  return (
    <Typography variant={muiVariant} component={variant} className={className}>
      {children}
    </Typography>
  );
}

export default Text;
