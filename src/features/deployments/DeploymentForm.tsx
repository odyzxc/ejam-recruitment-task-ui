import React from "react";
import { Formik } from "formik";
import { object, string, MixedSchema } from "yup";
import { Deployment } from "../../api/deployments";

export type DeploymentFormValues = Partial<Deployment>;

interface DFProps {
  onSubmit: (values: DeploymentFormValues) => void;
}

// TODO move to backend
const templates = [
  {
    name: "Natural One",
    versions: ["1.0.0", "1.0.1", "1.1.0", "2.0.0"],
  },
  {
    name: "Techno 01",
    versions: ["1.0.0", "1.1.1", "2.0.1"],
  },
  {
    name: "Sporty",
    versions: ["1.0.0", "1.1.0", "1.2.0", "1.2.1", "1.3.0", "2.0.0"],
  },
];

const templateNames = templates.map((template) => template.name);
const getTemplateVersions = (templateName: string) =>
  templates.find((template) => template.name === templateName)?.versions;

const isValuesEmpty = (values: DeploymentFormValues) =>
  !values.url || !values.templateName || !values.version;

// in real world application we could use common validation model for both frontend and backend and deploy it as standalone infrastructure package, but let's keep it simple here ;)
export const deploymentFormValidationSchema = object().shape<
  DeploymentFormValues
>({
  url: string().url().required(),
  templateName: string().oneOf(templateNames).required(),
  version: string().when(
    "templateName",
    (templateName: string, schema: MixedSchema<any>) =>
      schema.oneOf(getTemplateVersions(templateName) || []).required()
  ),
});

const DeploymentForm: React.FunctionComponent<DFProps> = ({ onSubmit }) => {
  const initialValues: DeploymentFormValues = {
    url: "",
    templateName: "",
    version: "",
  };
  return (
    <div>
      <h1>Create deployment</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={deploymentFormValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="url"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.url}
            />
            {errors.url && touched.url && errors.url}
            <select
              name="templateName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.templateName}
            >
              <option key="empty_templateName_option" value="">
                No template selected
              </option>
              {templateNames.map((templateName) => (
                <option key={templateName} value={templateName}>
                  {templateName}
                </option>
              ))}
            </select>
            {errors.templateName && touched.templateName && errors.templateName}
            <select
              name="version"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.version}
            >
              {
                <option key="empty_version_option" value="">
                  {!values.templateName
                    ? "Please select template first"
                    : "No version selected"}
                </option>
              }
              {templates
                .find((template) => values.templateName === template.name)
                ?.versions.map((version) => (
                  <option key={version} value={version}>
                    {version}
                  </option>
                ))}
            </select>
            {errors.version && touched.version && errors.version}
            <button
              type="submit"
              disabled={isSubmitting || isValuesEmpty(values)}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default DeploymentForm;
