import {createSelector} from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const getState = (state: RootState) => state.deployments;

export const getDeployments = createSelector(getState, state => state.deployments);