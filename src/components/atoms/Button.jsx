const Button = ({ children, className = "", type = "button", disabled = false, ...props }) => {
    const disabledStyles = disabled ? "opacity-60 cursor-not-allowed hover:bg-white" : "hover:bg-gray-200";

    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold text-black 
            bg-white 
            focus-visible:outline-gray-400 focus-visible:outline-2
            ${disabledStyles}
            ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;