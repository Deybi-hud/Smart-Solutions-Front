const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
const phoneRegex = /^[92]\d{8}$/;

const validateName = (name) => {
  if (!name?.trim()) return "El nombre es obligatorio";
  if (name.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
  if (name.trim().length > 50) return "El nombre no puede superar los 50 caracteres";
  if (!nameRegex.test(name.trim())) return "El nombre solo puede contener letras";
  return null;
};

const validateLastName = (lastName) => {
  if (!lastName?.trim()) return "El apellido es obligatorio";
  if (lastName.trim().length < 3) return "El apellido debe tener al menos 3 caracteres";
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
