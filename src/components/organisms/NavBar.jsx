import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = ({ onAboutClick, showAuthLinks = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMINISTRADOR";

  return (
    <nav className="bg-gray-900 border-b border-blue-700 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between gap-4">
        <Link to="/home" className="text-xl font-bold text-blue-400 tracking-tight">
          Smart Solutions
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium">
          {showAuthLinks ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition">
                Iniciar sesión
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-500 transition">
                Registrarse
              </Link>
            </>
          ) : (
            <>
              {onAboutClick && (
                <button onClick={onAboutClick} className="text-gray-300 hover:text-white transition cursor-pointer">
                  ¿Quiénes somos?
                </button>
              )}
              {isAdmin && (
                <button onClick={() => navigate("/admin")} className="text-gray-300 hover:text-blue-400 transition cursor-pointer">
                  Admin
                </button>
              )}
              <button onClick={() => navigate("/profile")} className="text-gray-300 hover:text-blue-400 transition cursor-pointer" title="Mi perfil">
                  Perfil
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
