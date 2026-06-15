import Box from "@mui/material/Box";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import ProfileCard from "../components/organisms/ProfileCard";
import SubscriptionCard from "../components/organisms/SubscriptionCard";

const ProfilePage = () => (
  <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
    <NavBar />
    <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 }, px: 2 }}>
      <Box sx={{ maxWidth: "448px", mx: "auto" }}>
        <ProfileCard />
        <SubscriptionCard />
      </Box>
    </Box>
    <Footer />
  </Box>
);

export default ProfilePage;
