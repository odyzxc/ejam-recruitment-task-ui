import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deployment, getDeployments } from "api/deployments";
import { AppDispatch } from "store/store";

interface DeploymentsState {
  deployments: Array<Deployment>;
  isLoading: boolean;
  error: string | null;
}

const initialDeploymentsState: DeploymentsState = {
  deployments: [],
  isLoading: false,
  error: null
};

const deploymentsSlice = createSlice({
  name: "deployments",
  initialState: initialDeploymentsState,
  reducers: {
    getDeploymentsRequest: state => {
      state.isLoading = true;
    },
    getDeploymentsSuccess: (
      state,
      { payload }: PayloadAction<Array<Deployment>>
    ) => {
      state.isLoading = false;
      state.deployments = payload;
    },
    getDeploymentsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    }
  }
});

const {
  getDeploymentsRequest,
  getDeploymentsSuccess,
  getDeploymentsFailure
} = deploymentsSlice.actions;

export const fetchDeployments = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getDeploymentsRequest());
    const deployments = await getDeployments();
    dispatch(getDeploymentsSuccess(deployments));
  } catch (err) {
    dispatch(getDeploymentsFailure(err.toString()));
  }
};

export default deploymentsSlice.reducer;
