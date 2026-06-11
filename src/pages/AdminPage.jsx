import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import LocationPanel from "../components/organisms/LocationPanel";
import UsersPanel from "../components/organisms/UsersPanel";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    // Contenedor raíz de la página de administración
    // Fondo: blanco rosado muy suave, ocupa toda la pantalla
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FDF6F4",
      }}
    >
      <NavBar />

      <Box component="main" sx={{ flex: 1, py: 4, px: 2 }}>
        <Box sx={{ maxWidth: "768px", mx: "auto" }}>

          {/* Título de la sección */}
          <Typography
            variant="h4"
            sx={{ color: "#3D2B2B", fontWeight: 700, mb: 3 }}
          >
            Panel de Administración
          </Typography>

          {/* Tabs de navegación interna entre secciones */}
          {/* El indicador activo y el texto seleccionado se manejan en theme.js */}
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{ mb: 3, borderBottom: "1px solid #EDD9D5" }}  // Borde inferior divisor rosa
          >
            <Tab label="Regiones / Comunas / Sucursales" />
            <Tab label="Usuarios" />
          </Tabs>

          {/* Panel activo según tab seleccionado */}
          {activeTab === 0 && <LocationPanel />}
          {activeTab === 1 && <UsersPanel />}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default AdminPage;
