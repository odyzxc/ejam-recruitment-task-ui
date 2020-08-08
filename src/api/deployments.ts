import axios from "axios";

export interface Deployment {
  _id?: string;
  url: string;
  templateName: string;
  version: string;
  deployedAt: Date;
}

const deploymentApiRoot =
  "https://ejam-recruitment-task-api.herokuapp.com/api/deployments";

export const getDeployments = async () => {
  try {
    const result = await axios.get<Deployment[]>(deploymentApiRoot);
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const postDeployment = async (deployment: Deployment) => {
  return await axios.post<Deployment[]>(deploymentApiRoot, deployment);
};

export const deleteDeployment = async (deploymentId: string) => {
  const url = `${deploymentApiRoot}/${deploymentId}`;
  return await axios.delete<Deployment[]>(url);
};
