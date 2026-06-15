import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import LocationPanel from "../components/organisms/LocationPanel";
import UsersPanel from "../components/organisms/UsersPanel";
import PlansPanel from "../components/organisms/PlansPanel";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
      <NavBar />

      <Box component="main" sx={{ flex: 1, py: 4, px: 2 }}>
        <Box sx={{ maxWidth: "960px", mx: "auto" }}>
          <Typography variant="h4" sx={{ color: "text.primary", mb: 3 }}>
            Panel de Administración
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{ mb: 3, borderBottom: "1px solid", borderBottomColor: "divider" }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Regiones / Comunas / Sucursales" />
            <Tab label="Usuarios" />
            <Tab label="Planes" />
          </Tabs>

          {activeTab === 0 && <LocationPanel />}
          {activeTab === 1 && <UsersPanel />}
          {activeTab === 2 && <PlansPanel />}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default AdminPage;
