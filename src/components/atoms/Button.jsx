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
        backgroundColor: "#FFFFFF",
        color: "#D4627A",
        border: "1px solid #EDD9D5",
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
