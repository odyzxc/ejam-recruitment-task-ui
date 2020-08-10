import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deployment, postDeployment } from "api/deployments";
import { AppDispatch } from "store/store";
import { DeploymentFormValues } from "./DeploymentForm";

interface DeploymentsSavingState {
  isLoading: boolean;
  error: string | null;
}

const initialDeploymentsState: DeploymentsSavingState = {
  isLoading: false,
  error: null,
};

const deploymentSavingSlice = createSlice({
  name: "deployments/save",
  initialState: initialDeploymentsState,
  reducers: {
    saveDeploymentRequest: (state) => {
      state.isLoading = true;
    },
    saveDeploymentSuccess: (state, { payload }: PayloadAction<Deployment>) => {
      state.isLoading = false;
    },
    saveDeploymentFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

const {
  saveDeploymentRequest,
  saveDeploymentFailure,
} = deploymentSavingSlice.actions;

export const { saveDeploymentSuccess } = deploymentSavingSlice.actions;

export const createDeployment = (deployment: DeploymentFormValues) => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(saveDeploymentRequest());
    const savedDeployment = await postDeployment(deployment);
    dispatch(saveDeploymentSuccess(savedDeployment));
  } catch (err) {
    dispatch(saveDeploymentFailure(err.toString()));
  }
};

export default deploymentSavingSlice.reducer;
