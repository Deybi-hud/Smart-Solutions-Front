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
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#030712" }}>
      <NavBar />
      <Box component="main" sx={{ flex: 1, py: 4, px: 2 }}>
        <Box sx={{ maxWidth: "768px", mx: "auto" }}>
          <Typography variant="h4" sx={{ color: "#ffffff", fontWeight: 700, mb: 3 }}>
            Panel de Administración
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{ mb: 3, borderBottom: "1px solid #1f2937" }}
          >
            <Tab label="Regiones / Comunas / Sucursales" />
            <Tab label="Usuarios" />
          </Tabs>

          {activeTab === 0 && <LocationPanel />}
          {activeTab === 1 && <UsersPanel />}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminPage;
