import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDeployments } from "features/deployments/deploymentSlice";
import { getDeployments } from "features/deployments/selectors";

export const DeploymentsListPage = () => {
  const dispatch = useDispatch();
  const deployments = useSelector(getDeployments);
  useEffect(() => {
    dispatch(fetchDeployments());
  }, []);
  return (
    <>
      <pre>deployments: {JSON.stringify(deployments)}</pre>
    </>
  );
};
