import { useAuth } from "../../hooks/useAuth";
import Button from "../atoms/Button";
import Container from "../atoms/Container";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        return (
            <Container size="md">
                <div className="text-center text-white">
                    <p>Cargando información del usuario...</p>
                </div>
            </Container>
        );
    }

    return (
        <Container size="md">
            <div className="bg-gray-900 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>

                <div className="space-y-4 mb-8">
                    <div className="border-b border-gray-700 pb-4">
                        <p className="text-sm text-gray-400">Correo</p>
                        <p className="text-lg font-medium">{user.email}</p>
                    </div>

                    {user.name && (
                        <div className="border-b border-gray-700 pb-4">
                            <p className="text-sm text-gray-400">Nombre</p>
                            <p className="text-lg font-medium">{user.name}</p>
                        </div>
                    )}

                    {user.lastName && (
                        <div className="border-b border-gray-700 pb-4">
                            <p className="text-sm text-gray-400">Apellido</p>
                            <p className="text-lg font-medium">{user.lastName}</p>
                        </div>
                    )}

                    {user.phone && (
                        <div className="border-b border-gray-700 pb-4">
                            <p className="text-sm text-gray-400">Teléfono</p>
                            <p className="text-lg font-medium">{user.phone}</p>
                        </div>
                    )}

                    {user.phoneNumber && (
                        <div className="border-b border-gray-700 pb-4">
                            <p className="text-sm text-gray-400">Teléfono</p>
                            <p className="text-lg font-medium">{user.phoneNumber}</p>
                        </div>
                    )}

                    {user.role && (
                        <div className="border-b border-gray-700 pb-4">
                            <p className="text-sm text-gray-400">Rol</p>
                            <p className="text-lg font-medium capitalize">{user.role.toLowerCase()}</p>
                        </div>
                    )}
                </div>

                <Button 
                    onClick={handleLogout} 
                    className="w-full !bg-red-600 !text-white hover:!bg-red-700"
                >
                    Cerrar sesión
                </Button>
            </div>
        </Container>
    );
};

export default UserProfile;
