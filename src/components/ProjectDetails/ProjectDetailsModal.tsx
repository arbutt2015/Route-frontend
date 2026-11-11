import Modal from "react-bootstrap/Modal";
import { useMemo } from "react";
import { Container } from "../CreateProject/CreateProjectModal.style";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import WebStorage from "../../utils/WebStorage";
import closeIcon from "../../assets/images/close-icon-btn.png";
import type { ISelectedProject } from "../../types";

export interface IProjectDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  onUpdated?: () => void;
}

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  description: Yup.string(),
});

const scopeFileName = (path?: string) => {
  const base = path?.split("/").filter(Boolean).pop();
  return base || "Scope.geojson";
};

export const ProjectDetailsModal = ({
  show,
  handleClose,
  onUpdated,
}: IProjectDetailsModalProps) => {
  const project = useMemo(
    () => WebStorage.getLocalStore<ISelectedProject>("selectedProject"),
    [],
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      size="lg"
    >
      <Container>
        <div className="modal-shell-header">
          <p className="modal-shell-label">Project Details</p>
          <button
            type="button"
            className="modal-shell-close-btn"
            onClick={handleClose}
            aria-label="Close project details"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            projectName: project
              ? `${project.projectNumber} - ${project.projectName}`
              : "",
            description: project?.description ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (project) {
              const [numberPart, ...nameParts] = values.projectName.split(" - ");
              WebStorage.setLocalStore("selectedProject", {
                ...project,
                projectNumber: nameParts.length
                  ? numberPart.trim()
                  : project.projectNumber,
                projectName: nameParts.length
                  ? nameParts.join(" - ").trim()
                  : numberPart.trim(),
                description: values.description,
              });
            }
            onUpdated?.();
            handleClose();
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <fieldset className="info-panel">
                <legend>Project Information</legend>
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={values.projectName}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched("projectName", true)}
                  />
                  {errors.projectName && touched.projectName && (
                    <div className="validation-error-message">
                      {errors.projectName}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <a
                  className="project-scope-link"
                  href={project?.geoJsonS3FilePath || "#"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!project?.geoJsonS3FilePath) e.preventDefault();
                  }}
                >
                  {scopeFileName(project?.geoJsonS3FilePath)}
                </a>
              </fieldset>
              <div className="modal-shell-footer">
                <Button
                  type="button"
                  onClick={handleClose}
                  className="modal-shell-cancel-btn"
                >
                  Cancel
                </Button>
                <Button type="submit" className="modal-shell-submit-btn">
                  Update Project
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};
