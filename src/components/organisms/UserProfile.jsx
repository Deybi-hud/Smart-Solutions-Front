import { useAuth } from "../../hooks/useAuth";
import Button from "../atoms/Button";
import Container from "../atoms/Container";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body1" sx={{ color: "#9C7878" }}>
                        Cargando información del usuario...
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container size="md">
            <Box 
                sx={{ 
                    backgroundColor: "#FFFFFF", 
                    border: "1px solid #EDD9D5", 
                    borderRadius: "14px", 
                    p: 4 
                }}
            >
                <Typography variant="h5" sx={{ color: "#3D2B2B", fontWeight: 700, mb: 4 }}>
                    Mi Perfil
                </Typography>

                <Stack spacing={3} sx={{ mb: 4 }}>
                    <Box sx={{ borderBottom: "1px solid #EDD9D5", pb: 2 }}>
                        <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
                            Correo
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#3D2B2B", fontWeight: 500 }}>
                            {user.email}
                        </Typography>
                    </Box>

                    {user.name && (
                        <Box sx={{ borderBottom: "1px solid #EDD9D5", pb: 2 }}>
                            <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
                                Nombre
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#3D2B2B", fontWeight: 500 }}>
                                {user.name}
                            </Typography>
                        </Box>
                    )}

                    {user.lastName && (
                        <Box sx={{ borderBottom: "1px solid #EDD9D5", pb: 2 }}>
                            <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
                                Apellido
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#3D2B2B", fontWeight: 500 }}>
                                {user.lastName}
                            </Typography>
                        </Box>
                    )}

                    {user.phone && (
                        <Box sx={{ borderBottom: "1px solid #EDD9D5", pb: 2 }}>
                            <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
                                Teléfono
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#3D2B2B", fontWeight: 500 }}>
                                {user.phone}
                            </Typography>
                        </Box>
                    )}

                    {user.role && (
                        <Box sx={{ borderBottom: "1px solid #EDD9D5", pb: 2 }}>
                            <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
                                Rol
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#3D2B2B", fontWeight: 500 }}>
                                {user.role}
                            </Typography>
                        </Box>
                    )}
                </Stack>

                <Button 
                    onClick={handleLogout} 
                    sx={{ 
                        backgroundColor: "#C0392B", 
                        color: "#FFFFFF",
                        "&:hover": { backgroundColor: "#A93226" }
                    }}
                >
                    Cerrar sesión
                </Button>
            </Box>
        </Container>
    );
};

export default UserProfile;