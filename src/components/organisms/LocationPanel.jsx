import Stack from "@mui/material/Stack";
import RegionsPanel from "./RegionsPanel";
import CommunesPanel from "./CommunesPanel";
import AddressesPanel from "./AddressesPanel";

const LocationPanel = () => (
  <Stack spacing={3}>
    <RegionsPanel />
    <CommunesPanel />
    <AddressesPanel />
  </Stack>
);

export default LocationPanel;
