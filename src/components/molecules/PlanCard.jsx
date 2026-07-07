import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import Chip from "@mui/material/Chip";

const SERVICE_TYPE_LABELS = {
  VIRTUAL: "Virtual",
  PRESENCIAL: "Presencial",
  AMBAS: "Virtual y presencial",
};

// Tarjeta estandarizada: misma altura y estructura sin importar cuánto varíe
// el nombre, la descripción o el tipo de servicio de cada plan.
const PlanCard = ({ plan, onSelect }) => (
  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      p: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 1,
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
      <Typography
        variant="h6"
        sx={{
          color: "text.primary",
          fontWeight: 600,
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={plan.name}
      >
        {plan.name}
      </Typography>
      <Chip
        label={`${plan.durationMonths} mes${plan.durationMonths !== 1 ? "es" : ""}`}
        size="small"
        variant="outlined"
        color="primary"
        sx={{ flexShrink: 0 }}
      />
    </Box>

    {plan.serviceType && (
      <Chip
        label={SERVICE_TYPE_LABELS[plan.serviceType] || plan.serviceType}
        size="small"
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      />
    )}

    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        flex: 1,
        minHeight: "3.6em",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {plan.details || ""}
    </Typography>

    <Typography variant="h5" sx={{ color: "primary.dark", fontWeight: 700 }}>
      ${Number(plan.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })}
    </Typography>

    <MuiButton variant="contained" fullWidth onClick={() => onSelect(plan)}>
      Comprar
    </MuiButton>
  </Box>
);

export default PlanCard;
