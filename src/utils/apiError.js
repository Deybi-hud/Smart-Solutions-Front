export const extractApiErrorMessage = (err, fallback) => {
  const data = err?.data;
  if (!data) return fallback;
  if (data.message) return data.message;
  if (data.error) return data.error;
  if (data.details) {
    const first = Object.values(data.details)[0];
    if (first) return first;
  }
  return fallback;
};
