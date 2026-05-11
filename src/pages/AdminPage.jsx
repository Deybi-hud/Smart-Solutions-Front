import { useState } from "react";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import LocationPanel from "../components/organisms/LocationPanel";
import UsersPanel from "../components/organisms/UsersPanel";

const TABS = [
  { key: "locations", label: "Regiones / Comunas / Sucursales" },
  { key: "users", label: "Usuarios" },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("locations");

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavBar />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Panel de Administración</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-700">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "locations" && <LocationPanel />}
          {activeTab === "users" && <UsersPanel />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
