const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
const phoneRegex = /^[92]\d{8}$/;
const placeNameRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s0-9]+$/;
const streetRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s0-9.-]+$/;
const numberRegex = /^[a-zA-Z0-9\-\s]+$/;

const validateName = (name) => {
  if (!name?.trim()) return "El nombre es obligatorio";
  if (name.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
  if (name.trim().length > 50) return "El nombre no puede superar los 50 caracteres";
  if (!nameRegex.test(name.trim())) return "El nombre solo puede contener letras";
  return null;
};

const validateLastName = (lastName) => {
  if (!lastName?.trim()) return "El apellido es obligatorio";
  if (lastName.trim().length < 2) return "El apellido debe tener al menos 2 caracteres";
  if (lastName.trim().length > 50) return "El apellido no puede superar los 50 caracteres";
  if (!nameRegex.test(lastName.trim())) return "El apellido solo puede contener letras";
  return null;
};

const validateEmail = (email) => {
  if (!email?.trim()) return "El correo es obligatorio";
  if (email.length > 100) return "El correo no puede superar los 100 caracteres";
  if (!emailRegex.test(email)) return "Formato de correo inválido";
  return null;
};

const validatePhone = (phone) => {
  if (!phone?.trim()) return "El teléfono es obligatorio";
  const digits = phone.replace(/\s/g, "");
  if (!/^\d+$/.test(digits)) return "El teléfono solo puede contener dígitos";
  if (!phoneRegex.test(digits)) return "Ingresa un teléfono chileno válido (9 dígitos, comenzando con 9 o 2)";
  return null;
};

const validatePassword = (password) => {
  if (!password) return "La contraseña es obligatoria";
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
  if (!/[a-z]/.test(password)) return "La contraseña debe incluir al menos una minúscula";
  if (!/[A-Z]/.test(password)) return "La contraseña debe incluir al menos una mayúscula";
  if (!/\d/.test(password)) return "La contraseña debe incluir al menos un número";
  return null;
};

const validatePasswordMatch = (password, confirm) => {
  if (!confirm) return "Debes confirmar la contraseña";
  if (password !== confirm) return "Las contraseñas no coinciden";
  return null;
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  const e = validateEmail(email); if (e) errors.email = e;
  const p = validatePassword(password); if (p) errors.password = p;
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateRegisterForm = (formData) => {
  const errors = {};
  const n = validateName(formData.name); if (n) errors.name = n;
  const l = validateLastName(formData.lastName); if (l) errors.lastName = l;
  const e = validateEmail(formData.email); if (e) errors.email = e;
  const ph = validatePhone(formData.phone); if (ph) errors.phone = ph;
  const p = validatePassword(formData.password); if (p) errors.password = p;
  const pm = validatePasswordMatch(formData.password, formData.confirmPassword); if (pm) errors.confirmPassword = pm;
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateContactForm = (formData) => {
  const errors = {};
  const n = validateName(formData.name); if (n) errors.name = n;
  const l = validateLastName(formData.lastName); if (l) errors.lastName = l;
  const ph = validatePhone(formData.phone); if (ph) errors.phone = ph;
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateEmailChangeForm = (formData) => {
  const errors = {};
  const e = validateEmail(formData.newEmail); if (e) errors.newEmail = e;
  if (!formData.confirmNewEmail?.trim()) errors.confirmNewEmail = "Debes confirmar el correo";
  else if (formData.newEmail !== formData.confirmNewEmail) errors.confirmNewEmail = "Los correos no coinciden";
  if (!formData.password?.trim()) errors.password = "La contraseña actual es obligatoria";
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validatePasswordChangeForm = (formData) => {
  const errors = {};
  if (!formData.currentPassword?.trim()) errors.currentPassword = "La contraseña actual es obligatoria";
  const p = validatePassword(formData.newPassword); if (p) errors.newPassword = p;
  const pm = validatePasswordMatch(formData.newPassword, formData.confirmNewPassword); if (pm) errors.confirmNewPassword = pm;
  return Object.keys(errors).length === 0 ? null : errors;
};

// ---- Ubicaciones (regiones, comunas, sucursales) ----
// Reglas espejo de RegionDTO/CommuneDTO/AddressDTO en Smart-Solutions-Auth-API

const validatePlaceName = (name, label, min = 2, max = 100) => {
  if (!name?.trim()) return `El nombre de ${label} es obligatorio`;
  if (name.trim().length < min || name.trim().length > max) return `El nombre de ${label} debe tener entre ${min} y ${max} caracteres`;
  if (!placeNameRegex.test(name.trim())) return `El nombre de ${label} contiene caracteres inválidos`;
  return null;
};

export const validateRegionForm = (formData) => {
  const errors = {};
  const n = validatePlaceName(formData.regionName, "la región", 2, 100); if (n) errors.regionName = n;
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateCommuneForm = (formData) => {
  const errors = {};
  const n = validatePlaceName(formData.communeName, "la comuna", 2, 100); if (n) errors.communeName = n;
  if (!formData.regionId) errors.regionId = "Debes seleccionar una región";
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateAddressForm = (formData) => {
  const errors = {};
  const s = validatePlaceName(formData.sucursalName, "la sucursal", 2, 50); if (s) errors.sucursalName = s;

  if (!formData.street?.trim()) errors.street = "La calle es obligatoria";
  else if (formData.street.trim().length < 2 || formData.street.trim().length > 150) errors.street = "La calle debe tener entre 2 y 150 caracteres";
  else if (!streetRegex.test(formData.street.trim())) errors.street = "La calle contiene caracteres inválidos";

  if (!formData.number?.trim()) errors.number = "El número es obligatorio";
  else if (formData.number.trim().length > 20) errors.number = "El número no puede superar los 20 caracteres";
  else if (!numberRegex.test(formData.number.trim())) errors.number = "El número de calle contiene caracteres inválidos";

  if (!formData.communeId) errors.communeId = "Debes seleccionar una comuna";
  return Object.keys(errors).length === 0 ? null : errors;
};

// ---- Planes de suscripción ----
// Reglas espejo de Validations.validatePlanDetails en Smart-Solutions-Core-API

export const validatePlanForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) errors.name = "El nombre del plan es obligatorio";
  else if (formData.name.trim().length < 2 || formData.name.trim().length > 100) errors.name = "El nombre del plan debe tener entre 2 y 100 caracteres";

  if (!formData.details?.trim()) errors.details = "La descripción del plan es obligatoria";
  else if (formData.details.trim().length > 255) errors.details = "La descripción no puede superar los 255 caracteres";

  const price = Number(formData.price);
  if (formData.price === "" || formData.price === null || formData.price === undefined || Number.isNaN(price)) errors.price = "El precio es obligatorio";
  else if (price < 0) errors.price = "El precio no puede ser negativo";

  const duration = Number(formData.durationMonths);
  if (formData.durationMonths === "" || formData.durationMonths === null || formData.durationMonths === undefined || !Number.isInteger(duration)) errors.durationMonths = "La duración es obligatoria";
  else if (duration < 1) errors.durationMonths = "La duración debe ser de al menos 1 mes";

  return Object.keys(errors).length === 0 ? null : errors;
};
