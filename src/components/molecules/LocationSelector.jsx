import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Dropdown from "../atoms/Dropdown";
import {
  useGetRegionsQuery,
  useGetCommunesQuery,
  useGetAddressesQuery,
} from "../../store/api/locationApi";

const LocationSelector = ({ onAddressSelect, error, disabled = false }) => {
  const [regionId, setRegionId] = useState("");
  const [communeId, setCommuneId] = useState("");
  const [addressId, setAddressId] = useState("");

  const { data: regions = [], isLoading: loadingRegions } = useGetRegionsQuery();
  const { data: communes = [], isLoading: loadingCommunes } = useGetCommunesQuery();
  const { data: addresses = [], isLoading: loadingAddresses } = useGetAddressesQuery();

  const filteredCommunes = communes.filter(
    (c) => String(c.regionId) === String(regionId)
  );

  const filteredAddresses = addresses.filter(
    (a) => String(a.communeId) === String(communeId)
  );

  useEffect(() => {
    setCommuneId("");
    setAddressId("");
    onAddressSelect(null);
  }, [regionId]);

  useEffect(() => {
    setAddressId("");
    onAddressSelect(null);
  }, [communeId]);

  const handleAddressChange = (e) => {
    const val = e.target.value;
    setAddressId(val);
    onAddressSelect(val ? Number(val) : null);
  };

  const regionOptions = regions.map((r) => ({ value: String(r.id), label: r.regionName }));
  const communeOptions = filteredCommunes.map((c) => ({ value: String(c.id), label: c.communeName }));
  const addressOptions = filteredAddresses.map((a) => ({
    value: String(a.id),
    label: `${a.sucursalName} — ${a.street} ${a.number}`,
  }));

  return (
    <Stack spacing={2}>
      <Dropdown
        label="Región"
        id="region"
        value={regionId}
        onChange={(e) => setRegionId(e.target.value)}
        options={regionOptions}
        placeholder={loadingRegions ? "Cargando regiones..." : "Selecciona una región"}
        disabled={disabled || loadingRegions}
      />
      <Dropdown
        label="Comuna"
        id="commune"
        value={communeId}
        onChange={(e) => setCommuneId(e.target.value)}
        options={communeOptions}
        placeholder={
          !regionId
            ? "Primero selecciona una región"
            : loadingCommunes
            ? "Cargando comunas..."
            : "Selecciona una comuna"
        }
        disabled={disabled || !regionId || loadingCommunes}
      />
      <Dropdown
        label="Sucursal"
        id="address"
        value={addressId}
        onChange={handleAddressChange}
        options={addressOptions}
        placeholder={
          !communeId
            ? "Primero selecciona una comuna"
            : loadingAddresses
            ? "Cargando sucursales..."
            : "Selecciona una sucursal"
        }
        disabled={disabled || !communeId || loadingAddresses}
        error={error}
      />
    </Stack>
  );
};

export default LocationSelector;
