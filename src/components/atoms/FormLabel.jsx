import MuiFormLabel from "@mui/material/FormLabel";

const FormLabel = ({ children, htmlFor, className }) => {
  return (
    <MuiFormLabel htmlFor={htmlFor} className={className}>
      {children}
    </MuiFormLabel>
  );
};

export default FormLabel;
