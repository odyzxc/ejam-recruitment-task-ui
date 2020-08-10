import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { fetchDeployments } from "features/deployments/deploymentSlice";
import { getDeployments } from "features/deployments/selectors";
import DeploymentForm from "./DeploymentForm";
import { createDeployment } from "./deploymentSavingSlice";
import { removeDeployment } from "./deploymentDeletingSlice";
import DeploymentsList from "./DeploymentsList";

export const DeploymentsPage = () => {
  const dispatch = useDispatch();
  const deployments = useSelector(getDeployments);
  useEffect(() => {
    dispatch(fetchDeployments());
  }, [dispatch]);
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <DeploymentForm
          onSubmit={(values) => dispatch(createDeployment(values))}
        />
      </Grid>
      <Grid item md={12}>
        <DeploymentsList
          deployments={deployments}
          onDelete={(deploymentId) => dispatch(removeDeployment(deploymentId))}
        />
      </Grid>
    </Grid>
  );
};
