import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";

import { Deployment } from "api/deployments";

interface DLProps {
  deployments: Deployment[];
  onDelete: (deploymentId: string) => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "No date";
  }
  try {
    const date = new Date(dateString);
    return date.toLocaleString();
  } catch (err) {
    console.error(err);
    return "Invalid date";
  }
};

const DeploymentsList: React.FunctionComponent<DLProps> = ({
  deployments = [],
  onDelete,
}) => {
  return (
    <div>
      <List component="nav" aria-label="deployments list">
        {deployments.map((deployment) => (
          <ListItem key={`deploymentListItem_${deployment._id}`}>
            <ListItemText primary={deployment.url} />
            <ListItemText
              secondary={`${deployment.templateName} - ${
                deployment.version
              } deployed at: ${formatDate(deployment.deployedAt)}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete deployment"
                onClick={() => onDelete(deployment._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DeploymentsList;
