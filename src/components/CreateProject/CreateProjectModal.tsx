import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import { Container } from "./CreateProjectModal.style";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toastInfoMessage } from "../../utils/constant";
import closeIcon from "../../assets/images/close-icon-btn.png";

export interface ICreateProjectModalProps {
  show: boolean;
  handleClose: () => void;
}

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  description: Yup.string(),
});

export const CreateProjectModal = ({
  show,
  handleClose,
}: ICreateProjectModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [kmlFileName, setKmlFileName] = useState<string>("");

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
          <p className="modal-shell-label">Create New Project</p>
          <button
            type="button"
            className="modal-shell-close-btn"
            onClick={handleClose}
            aria-label="Close create project"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <Formik
          initialValues={{ projectName: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={() =>
            toastInfoMessage("Create project is not implemented yet.")
          }
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
                    placeholder="Project name"
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
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".kml,.kmz"
                  hidden
                  onChange={(e) =>
                    setKmlFileName(e.target.files?.[0]?.name ?? "")
                  }
                />
                <button
                  type="button"
                  className="upload-kml-btn hidden-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  + Upload KML File
                </button>
                {kmlFileName && (
                  <span className="upload-kml-file-name">{kmlFileName}</span>
                )}
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
                  Create Project
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};
