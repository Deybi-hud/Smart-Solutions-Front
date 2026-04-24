import React from "react";

const Input = ({ label, className = "", ...props }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <input
                {...props}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 ${className}`}
            />
        </div>
    );
};

export default Input;