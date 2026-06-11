import TextField from "@mui/material/TextField";

const Input = ({ label, className, disabled = false, ...props }) => {
  return (
    <TextField
      label={label}
      disabled={disabled}
      fullWidth
      size="small"
      className={className}
      variant="outlined"
      {...props}
    />
  );
};

export default Input;
