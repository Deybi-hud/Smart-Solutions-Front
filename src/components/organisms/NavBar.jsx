import { Link, useNavigate } from "react-router-dom";
import Container from "../atoms/Container";

const NavBar = ({ onAboutClick }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-900 border-b border-blue-700 py-4">
            <Container size="xl" className="flex flex-col sm:flex-row items-center justify-between px-4 gap-4 sm:gap-0">
                <Link to="/home" className="text-xl font-bold text-blue-400">
                    Smart Solutions
                </Link>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center sm:text-left items-center">
                    <Link 
                        to="/home" 
                        className="text-gray-300 text-sm font-medium"
                    >
                        Planes
                    </Link>
                    <button
                        onClick={onAboutClick}
                        className="text-gray-300 text-sm font-medium cursor-pointer"
                    >
                        ¿Quiénes somos?
                    </button>
                    <button
                        onClick={() => navigate("/profile")}
                        className="text-gray-300 text-sm font-medium cursor-pointer hover:text-blue-400 transition"
                        title="Mi perfil"
                    >
                        👤
                    </button>
                </div>
            </Container>
        </nav>
    );
};

export default NavBar;
