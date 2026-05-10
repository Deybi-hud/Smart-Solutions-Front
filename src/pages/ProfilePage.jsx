import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import { useGetProfileQuery, useLogoutMutation } from "../store/api/userApi";
import { logout } from "../store/slices/authSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch {
      // aunque falle en backend, limpiamos localmente
    }
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavBar />
      <main className="flex-1 py-8 sm:py-12 px-4">
        <div className="max-w-md mx-auto">
          {isLoading && (
            <p className="text-gray-400 text-center">Cargando perfil...</p>
          )}
          {isError && (
            <p className="text-red-500 text-center">Error al cargar el perfil.</p>
          )}
          {profile && (
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>

              <div className="space-y-4 mb-8">
                {[
                  { label: "Nombre", value: `${profile.name} ${profile.lastName}` },
                  { label: "Correo", value: profile.email },
                  { label: "Teléfono", value: profile.phone },
                  { label: "Sucursal", value: profile.sucursalName },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label} className="border-b border-gray-700 pb-4">
                      <p className="text-sm text-gray-400">{label}</p>
                      <p className="text-base font-medium">{value}</p>
                    </div>
                  ) : null
                )}
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-500 transition"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
