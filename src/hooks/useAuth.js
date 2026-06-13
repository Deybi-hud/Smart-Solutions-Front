import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../store/slices/authSlice";
import { useLogoutMutation } from "../store/api/userApi";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const [logoutServer] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutServer().unwrap();
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout: handleLogout,
    clearError: handleClearError,
  };
};