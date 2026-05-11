import { useState } from "react";
import { useSearchByEmailQuery, useSearchByPhoneQuery } from "../../store/api/userApi";

const UserResult = ({ user }) => {
  if (!user) return null;
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2 mt-4">
      {[
        { label: "Nombre", value: `${user.name} ${user.lastName}` },
        { label: "Correo", value: user.email },
        { label: "Teléfono", value: user.phone },
        { label: "Sucursal", value: user.sucursalName },
      ].map(({ label, value }) =>
        value ? (
          <div key={label} className="flex gap-2">
            <span className="text-gray-400 text-sm w-20 shrink-0">{label}:</span>
            <span className="text-white text-sm">{value}</span>
          </div>
        ) : null
      )}
    </div>
  );
};

const SearchByEmail = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByEmailQuery(query, { skip: !query });

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setQuery(input.trim());
  };

  return (
    <div className="bg-gray-900 rounded-xl p-5 space-y-3">
      <h3 className="text-white font-semibold text-lg">Buscar por correo</h3>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="usuario@correo.com"
          type="email"
          className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
        />
        <button type="submit" disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-500 disabled:opacity-50 transition">
          {isLoading ? "..." : "Buscar"}
        </button>
      </form>
      {isError && (
        <p className="text-red-400 text-sm">
          {error?.data?.message || "Usuario no encontrado."}
        </p>
      )}
      <UserResult user={data} />
    </div>
  );
};

const SearchByPhone = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByPhoneQuery(query, { skip: !query });

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setQuery(input.trim());
  };

  return (
    <div className="bg-gray-900 rounded-xl p-5 space-y-3">
      <h3 className="text-white font-semibold text-lg">Buscar por teléfono</h3>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="912345678"
          maxLength={9}
          className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
        />
        <button type="submit" disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-500 disabled:opacity-50 transition">
          {isLoading ? "..." : "Buscar"}
        </button>
      </form>
      {isError && (
        <p className="text-red-400 text-sm">
          {error?.data?.message || "Usuario no encontrado."}
        </p>
      )}
      <UserResult user={data} />
    </div>
  );
};

const UsersPanel = () => {
  return (
    <div className="space-y-6">
      <SearchByEmail />
      <SearchByPhone />
    </div>
  );
};

export default UsersPanel;
