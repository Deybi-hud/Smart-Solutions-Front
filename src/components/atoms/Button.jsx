const Button = ({ children, className = "", type = "button", ...props }) => {
    return (
        <button
            {...props}
            type={type}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold text-black 
            bg-white hover:bg-gray-200 
            focus-visible:outline-gray-400 focus-visible:outline-2
            ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;