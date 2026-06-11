import TextField from "@mui/material/TextField";

const FormField = ({ label, id, error, className, ...props }) => {
  return (
    <TextField
      id={id}
      label={label}
      error={!!error}
      helperText={error || ""}
      fullWidth
      size="small"
      variant="outlined"
      className={className}
      FormHelperTextProps={{ sx: { mx: 0 } }}
      {...props}
    />
  );
};

export default FormField;
