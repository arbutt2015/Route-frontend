import Modal from "react-bootstrap/Modal";
import { useMemo, useRef, useState } from "react";
import { Container } from "../CreateProject/CreateProjectModal.style";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import WebStorage from "../../utils/WebStorage";
import closeIcon from "../../assets/images/close-icon-btn.png";
import type { ISelectedProject } from "../../types";
import {
  getProjectByIdApi,
  updateProjectApi,
  uploadFileApi,
} from "../../api/projects";
import {
  toastErrMessage,
  toastSuccessMessage,
} from "../../utils/constant";
import { FaPlus, FaXmark } from "react-icons/fa6";
import Loader from "../Loader/Loader";

export interface IProjectDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  onUpdated?: () => void;
}

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  description: Yup.string(),
  uploadShapeFile: Yup.mixed<File>()
    .nullable()
    .test(
      "is-kml",
      "Only .kml files are allowed",
      (file) => !file || file.name.toLowerCase().endsWith(".kml"),
    ),
});

const getFileNameFromUrl = (url?: string | null) => {
  if (!url) return "";
  const base =
    url.split("?")[0].split("/").filter(Boolean).pop() ?? "";
  try {
    return decodeURIComponent(base).replace(/^(\d+-)+/, "");
  } catch {
    return base.replace(/^(\d+-)+/, "");
  }
};

const truncateFileName = (fileName: string, maxLength: number) =>
  fileName.length > maxLength
    ? `${fileName.slice(0, maxLength)}...`
    : fileName;

export const ProjectDetailsModal = ({
  show,
  handleClose,
  onUpdated,
}: IProjectDetailsModalProps) => {
  const project = useMemo(
    () => WebStorage.getLocalStore<ISelectedProject>("selectedProject"),
    [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
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
          <p className="modal-shell-label">Project Information</p>
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
            projectNumber: project?.projectNumber ?? "",
            projectName: project?.projectName ?? "",
            description: project?.description ?? "",
            uploadShapeFile: null as File | null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!project) {
              handleClose();
              return;
            }
            setIsSubmitting(true);
            try {
              const payload: {
                projectId: number;
                projectName?: string;
                projectDescription?: string;
                shapeFileName?: string;
              } = { projectId: project.projectId };

              if (values.projectName !== project.projectName) {
                payload.projectName = values.projectName;
              }
              if (values.description !== (project.description ?? "")) {
                payload.projectDescription = values.description;
              }

              if (values.uploadShapeFile) {
                const formData = new FormData();
                formData.append("file", values.uploadShapeFile);
                const uploadRes = await uploadFileApi(formData);
                if (!uploadRes.success) {
                  toastErrMessage(
                    uploadRes.message || "KML upload failed.",
                  );
                  return;
                }
                payload.shapeFileName =
                  uploadRes.data?.files?.[0] ?? "";
              }

              if (
                payload.projectName === undefined &&
                payload.projectDescription === undefined &&
                payload.shapeFileName === undefined
              ) {
                handleClose();
                return;
              }

              const updateRes = await updateProjectApi(payload);
              if (!updateRes.success) {
                toastErrMessage(
                  updateRes.message || "Project update failed.",
                );
                return;
              }

              const refreshed = await getProjectByIdApi(
                project.projectId,
              );
              const updated = refreshed.success
                ? refreshed.data
                : null;

              WebStorage.setLocalStore("selectedProject", {
                ...project,
                projectName:
                  updated?.projectName ?? values.projectName,
                description:
                  updated?.projectDescription ?? values.description,
                kmlFileUrl:
                  updated?.kmlFileUrl ?? project.kmlFileUrl,
                geoJsonS3FilePath:
                  updated?.geoJsonFileUrl ??
                  project.geoJsonS3FilePath,
              });

              toastSuccessMessage("Project updated successfully.");
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
              onUpdated?.();
              handleClose();
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
          }) => {
            const isDirty =
              values.projectName !== (project?.projectName ?? "") ||
              values.description !== (project?.description ?? "") ||
              values.uploadShapeFile instanceof File;
            return (
            <Form onSubmit={handleSubmit}>
              <fieldset className="info-panel">
                <legend>Project</legend>
                <Form.Group>
                  <Form.Label className="required">
                    Project Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="projectNumber"
                    value={values.projectNumber}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label className="required">
                    Project Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={values.projectName}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched("projectName", true)}
                    isInvalid={
                      touched.projectName && !!errors.projectName
                    }
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
                <div className="upload-kml-row">
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
                    <FaPlus size={12} /> Upload KML File
                  </button>
                  <span className="upload-kml-file-name">
                    {values.uploadShapeFile instanceof File
                      ? truncateFileName(
                          values.uploadShapeFile.name,
                          50,
                        )
                      : truncateFileName(
                          getFileNameFromUrl(project?.kmlFileUrl),
                          70,
                        )}
                  </span>
                  {values.uploadShapeFile && (
                    <FaXmark
                      onClick={() => {
                        setFieldValue("uploadShapeFile", null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      style={{ cursor: "pointer", color: "red" }}
                      size={14}
                    />
                  )}
                </div>
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
                  disabled={isSubmitting || !isDirty}
                >
                  {isSubmitting ? <Loader label="" /> : "Update Project"}
                </Button>
              </div>
            </Form>
            );
          }}
        </Formik>
      </Container>
    </Modal>
  );
};
