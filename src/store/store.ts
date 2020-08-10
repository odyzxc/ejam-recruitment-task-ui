import { combineReducers, configureStore } from "@reduxjs/toolkit";
import deployments from "features/deployments/deploymentSlice";
import deploymentSave from "features/deployments/deploymentSavingSlice";

const store = configureStore({
  reducer: {
    deployments: combineReducers({
      data: deployments,
      save: deploymentSave,
    }),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
