import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const getState = (state: RootState) => state.deployments;

const getDataState = createSelector(getState, (state) => state.data);

export const getDeployments = createSelector(
  getDataState,
  (state) => state.deployments
);
export const isDeploymentsDataLoading = createSelector(
  getDataState,
  (state) => state.isLoading
);
