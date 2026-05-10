const Container = ({ children, className = "", size = "md" }) => {
    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "w-full"
    };

    return (
        <div className={`w-full ${sizeClasses[size]} mx-auto ${className}`}>
            {children}
        </div>
    );
};

export default Container;
