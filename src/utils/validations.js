const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (!email?.trim()) return "El correo es obligatorio";
  if (!emailRegex.test(email)) return "Formato de correo inválido";
  return null;
};

export const validatePassword = (password) => {
  if (!password?.trim()) return "La contraseña es obligatoria";
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
  return null;
};

export const validateName = (name) => {
  if (!name?.trim()) return "El nombre es obligatorio";
  return null;
};

export const validateLastName = (lastName) => {
  if (!lastName?.trim()) return "El apellido es obligatorio";
  return null;
};

export const validatePhone = (phone) => {
  if (!phone?.trim()) return "El teléfono es obligatorio";
  return null;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Las contraseñas no coinciden";
  return null;
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateRegisterForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  const lastNameError = validateLastName(formData.lastName);
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);
  const passwordMatchError = validatePasswordMatch(formData.password, formData.confirmPassword);
  const phoneError = validatePhone(formData.phone);

  if (nameError) errors.name = nameError;
  if (lastNameError) errors.lastName = lastNameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (passwordMatchError) errors.confirmPassword = passwordMatchError;
  if (phoneError) errors.phone = phoneError;

  return Object.keys(errors).length === 0 ? null : errors;
};
