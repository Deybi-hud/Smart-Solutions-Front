const FormLabel = ({ children, htmlFor, className = "" }) => {
    return (
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    );
};

export default FormLabel;