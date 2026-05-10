const Dropdown = ({ label, id, value, onChange, options, placeholder, disabled = false, error }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">{placeholder || "Selecciona una opción"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Dropdown;
