import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const loadUser = () => {
  try {
    const stored = localStorage.getItem("ss_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveUser = (user) => {
  try {
    localStorage.setItem("ss_user", JSON.stringify(user));
  } catch {}
};

const clearUser = () => {
  try {
    localStorage.removeItem("ss_user");
  } catch {}
};

const storedUser = loadUser();

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      clearUser();
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveUser(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        saveUser(action.payload);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Error al iniciar sesión";
      })
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Error al registrarse";
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
