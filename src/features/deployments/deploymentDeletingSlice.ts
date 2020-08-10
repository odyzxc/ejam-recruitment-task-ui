import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteDeployment } from "api/deployments";
import { AppDispatch } from "store/store";

interface DeploymentsDeletingState {
  isLoading: boolean;
  error: string | null;
}

const initialDeploymentsState: DeploymentsDeletingState = {
  isLoading: false,
  error: null,
};

const deploymentDeletingSlice = createSlice({
  name: "deployments/delete",
  initialState: initialDeploymentsState,
  reducers: {
    deleteDeploymentRequest: (state) => {
      state.isLoading = true;
    },
    deleteDeploymentSuccess: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
    },
    deleteDeploymentFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

const {
  deleteDeploymentRequest,
  deleteDeploymentFailure,
} = deploymentDeletingSlice.actions;

export const { deleteDeploymentSuccess } = deploymentDeletingSlice.actions;

export const removeDeployment = (deploymentId: string) => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(deleteDeploymentRequest());
    await deleteDeployment(deploymentId);
    dispatch(deleteDeploymentSuccess(deploymentId));
  } catch (err) {
    dispatch(deleteDeploymentFailure(err.toString()));
  }
};

export default deploymentDeletingSlice.reducer;
