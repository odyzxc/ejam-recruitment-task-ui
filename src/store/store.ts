import { combineReducers, configureStore } from "@reduxjs/toolkit";
import deployments from "features/deployments/deploymentSlice";
import deploymentSave from "features/deployments/deploymentSavingSlice";
import deploymentDelete from "features/deployments/deploymentDeletingSlice";

const store = configureStore({
  reducer: {
    deployments: combineReducers({
      data: deployments,
      save: deploymentSave,
      delete: deploymentDelete,
    }),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
