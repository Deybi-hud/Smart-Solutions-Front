import FormHelperText from "@mui/material/FormHelperText";

const ErrorMessage = ({ children, message }) => {
  const content = message || children;
  if (!content) return null;
  return (
    <FormHelperText error sx={{ mx: 0, mt: 0.5 }}>
      {content}
    </FormHelperText>
  );
};

export default ErrorMessage;
