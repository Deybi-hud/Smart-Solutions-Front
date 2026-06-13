import TextField from "@mui/material/TextField";

const FormField = ({ label, id, error, className, ...props }) => {
  return (
    <TextField
      id={id}
      label={label}
      error={!!error}
      helperText={error}
      className={className}
      {...props}
    />
  );
};

export default FormField;
