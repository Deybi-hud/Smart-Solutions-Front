import MuiButton from "@mui/material/Button";

const Button = ({ children, type = "button", disabled = false, onClick, ...props }) => {
  return (
    <MuiButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: "#ffffff",
        color: "#000000",
        boxShadow: "none",
        "&:hover": { backgroundColor: "#e5e7eb", boxShadow: "none" },
        "&.Mui-disabled": { backgroundColor: "#ffffff", opacity: 0.6, color: "#000000" },
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
