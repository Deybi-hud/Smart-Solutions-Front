import React from "react";

const Input = ({ label, className = "", disabled = false, ...props }) => {
    const disabledStyles = disabled ? "bg-gray-700 cursor-not-allowed opacity-60" : "";

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <input
                {...props}
                disabled={disabled}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 ${disabledStyles} ${className}`}
            />
        </div>
    );
};

export default Input;