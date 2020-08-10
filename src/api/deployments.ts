import axios, { Method } from "axios";
import { DeploymentFormValues } from "features/deployments/DeploymentForm";

export interface Deployment {
  _id?: string;
  url: string;
  templateName: string;
  version: string;
  deployedAt?: Date;
}

const deploymentApiRoot =
  "https://ejam-recruitment-task-api.herokuapp.com/api/deployments";

const createRequest = async <T>(
  url: string,
  method: Method,
  data?: any
): Promise<T> => {
  const config = {
    method,
    url,
    data,
  };
  try {
    const result = await axios.request<T>(config);
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const getDeployments = async () => {
  return await createRequest<Deployment[]>(deploymentApiRoot, "get");
};

export const postDeployment = async (deployment: DeploymentFormValues) => {
  return await createRequest<Deployment>(deploymentApiRoot, "post", deployment);
};

export const deleteDeployment = async (deploymentId: string) => {
  const url = `${deploymentApiRoot}/${deploymentId}`;
  return await createRequest<void>(url, "delete");
};
