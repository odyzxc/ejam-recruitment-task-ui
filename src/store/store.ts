import { configureStore } from "@reduxjs/toolkit";
import deployments from "features/deployments/deploymentSlice";

const store = configureStore({
  reducer: {
    deployments
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;
