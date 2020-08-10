import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDeployments } from "features/deployments/deploymentSlice";
import { getDeployments } from "features/deployments/selectors";
import DeploymentForm from "./DeploymentForm";
import { createDeployment } from "./deploymentSavingSlice";

export const DeploymentsPage = () => {
  const dispatch = useDispatch();
  const deployments = useSelector(getDeployments);
  useEffect(() => {
    dispatch(fetchDeployments());
  }, [dispatch]);
  return (
    <>
      <DeploymentForm
        onSubmit={(values) => dispatch(createDeployment(values))}
      />
      <pre>deployments: {JSON.stringify(deployments)}</pre>
    </>
  );
};
