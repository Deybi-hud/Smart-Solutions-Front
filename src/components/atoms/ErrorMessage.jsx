const ErrorMessage = ({ children, message }) => {
    const content = message || children;
    if (!content) return null;
    return <p className="mt-1 text-sm text-red-500">{content}</p>;
}

export default ErrorMessage;