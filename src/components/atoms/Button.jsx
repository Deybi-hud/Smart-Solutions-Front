import MuiButton from "@mui/material/Button";

const Button = ({ children, type = "button", disabled = false, onClick, ...props }) => {
  return (
    <MuiButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      fullWidth
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
