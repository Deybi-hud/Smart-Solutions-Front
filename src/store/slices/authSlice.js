import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";

const initialState = {
  user: null,
  isAuthenticated: false,
  // Iniciamos en true para evitar parpadeos de pantallas de login 
  // mientras verificamos la sesión al recargar la página.
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer manual por si necesitas limpiar el estado local
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Nota: login/register NO tocan `isLoading` — ese flag controla si App.jsx
      // muestra la pantalla completa de "Cargando sesión..." (desmontando toda la
      // app) mientras se verifica la sesión al cargar la página. Si se pusiera en
      // true aquí también, cada submit de login/registro desmontaría el formulario
      // a mitad de la petición, perdiendo los datos ingresados y el mensaje de error
      // (que terminaría seteándose sobre una instancia ya desmontada). El loading
      // propio de estos formularios ya lo entrega useLoginMutation()/useRegisterMutation().
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.error = action.payload?.message || "Error al iniciar sesión";
      })

      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.error = null;
      })
      .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
        state.error = action.payload?.message || "Error al registrarse";
      })

      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addMatcher(userApi.endpoints.getProfile.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(userApi.endpoints.getProfile.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload; 
      })
      .addMatcher(userApi.endpoints.getProfile.matchRejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;