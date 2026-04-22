import FormLabel from "../atoms/FormLabel";
import Input from "../atoms/Input";
import ErrorMessage from "../atoms/ErrorMessage";

const FormField = ({ label, id, error, className = "", ...props }) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
            <Input id={id} {...props} />
            <ErrorMessage>{error}</ErrorMessage>
        </div>
    );
};

export default FormField;