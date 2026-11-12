import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import { Container } from "./CreateProjectModal.style";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  toastErrMessage,
  toastSuccessMessage,
} from "../../utils/constant";
import { useMask } from "@react-input/mask";
import {
  createProjectApi,
  uploadFileApi,
} from "../../api/projects";
import Loader from "../Loader/Loader";
import closeIcon from "../../assets/images/close-icon-btn.png";

export interface ICreateProjectModalProps {
  show: boolean;
  handleClose: () => void;
  onCreated?: () => void;
}

const maskOptions = {
  mask: "Tddddd",
  replacement: { d: /\d/ },
};

const validationSchema = Yup.object().shape({
  projectNumber: Yup.string()
    .required("Project number is required.")
    .test(
      "Project Number",
      "Project number must have 5 digits.",
      (value: string | undefined) => !!value && value.length === 6,
    ),
  projectName: Yup.string().required("Project name is required"),
  description: Yup.string(),
  uploadShapeFile: Yup.mixed<File>()
    .required("KML file is required")
    .test(
      "is-kml",
      "Only .kml files are allowed",
      (file) => !file || file.name.toLowerCase().endsWith(".kml"),
    ),
});

export const CreateProjectModal = ({
  show,
  handleClose,
  onCreated,
}: ICreateProjectModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useMask(maskOptions);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          initialValues={{
            projectNumber: "",
            projectName: "",
            description: "",
            uploadShapeFile: null as File | null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsSubmitting(true);
            try {
              const formData = new FormData();
              if (!values.uploadShapeFile) return;
              formData.append("file", values.uploadShapeFile);

              const uploadRes = await uploadFileApi(formData);
              if (!uploadRes.success) {
                toastErrMessage(
                  uploadRes.message || "KML upload failed.",
                );
                return;
              }

              const createRes = await createProjectApi({
                projectNumber: values.projectNumber,
                projectName: values.projectName,
                projectDescription: values.description,
                shapeFileName: uploadRes.data?.files?.[0] ?? "",
              });
              if (!createRes.success) {
                toastErrMessage(
                  createRes.message || "Project creation failed.",
                );
                return;
              }

              toastSuccessMessage("Project created successfully.");
              resetForm();
              if (fileInputRef.current) fileInputRef.current.value = "";
              onCreated?.();
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <fieldset className="info-panel">
                <legend>Project Information</legend>
                <Form.Group>
                  <Form.Label>Project Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectNumber"
                    placeholder="T _ _ _ _ _"
                    value={values.projectNumber}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched("projectNumber", true)}
                    ref={inputRef}
                    isInvalid={
                      touched.projectNumber && !!errors.projectNumber
                    }
                  />
                  {errors.projectNumber && touched.projectNumber && (
                    <div className="validation-error-message">
                      {errors.projectNumber}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mt-3">
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
                  accept=".kml"
                  hidden
                  onChange={(e) => {
                    setFieldValue(
                      "uploadShapeFile",
                      e.target.files?.[0] ?? null,
                    );
                    setFieldTouched("uploadShapeFile", true, false);
                  }}
                />
                <button
                  type="button"
                  className="upload-kml-btn hidden-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  + Upload KML File
                </button>
                {values.uploadShapeFile && (
                  <span className="upload-kml-file-name">
                    {values.uploadShapeFile.name}
                  </span>
                )}
                {errors.uploadShapeFile && touched.uploadShapeFile && (
                  <div className="validation-error-message">
                    {errors.uploadShapeFile as string}
                  </div>
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
                <Button
                  type="submit"
                  className="modal-shell-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader label="" /> : "Create Project"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};
