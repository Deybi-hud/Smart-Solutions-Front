import Box from "@mui/material/Box";
import { RegionPanel } from "./RegionPanel";
import { CommunePanel } from "./CommunePanel";
import { AddressPanel } from "./AddressPanel";

const LocationPanel = () => {
  return (
    <Box>
      <RegionPanel />
      <CommunePanel />
      <AddressPanel />
    </Box>
  );
};

export default LocationPanel;