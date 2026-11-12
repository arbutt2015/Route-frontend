import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Container } from "../CreateProject/CreateProjectModal.style";
import { Button } from "react-bootstrap";
import WebStorage from "../../utils/WebStorage";
import {
  toastErrMessage,
  toastSuccessMessage,
} from "../../utils/constant";
import { updateProjectApi } from "../../api/projects";
import Loader from "../Loader/Loader";
import closeIcon from "../../assets/images/close-icon-btn.png";
import type { ISelectedProject } from "../../types";

export interface ILockProjectModalProps {
  show: boolean;
  handleClose: () => void;
}

export const LockProjectModal = ({
  show,
  handleClose,
}: ILockProjectModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const project =
    WebStorage.getLocalStore<ISelectedProject>("selectedProject");
  const alreadyLocked = !!project?.isLocked;

  const handleLock = async () => {
    if (!project) {
      handleClose();
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await updateProjectApi({
        projectId: project.projectId,
        isLocked: true,
      });
      if (!res.success) {
        toastErrMessage(res.message || "Could not lock the project.");
        return;
      }
      WebStorage.setLocalStore("selectedProject", {
        ...project,
        isLocked: true,
      });
      toastSuccessMessage("Project locked successfully.");
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Container>
        <div className="modal-shell-header">
          <p className="modal-shell-label">Lock Project?</p>
          <button
            type="button"
            className="modal-shell-close-btn"
            onClick={handleClose}
            aria-label="Close lock project"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <p>
          Once locked, this project cannot be edited. You can unlock it to make
          changes, but only before it has been downloaded in the Transconomy
          Route mobile application.
        </p>
        <p>
          Locked projects will be available to open in the mobile application
          using the Route Code.
        </p>
        {alreadyLocked && (
          <p
            style={{
              color: "var(--error-message-color)",
              fontWeight: 600,
            }}
          >
            This project is already locked.
          </p>
        )}
        <div className="modal-shell-footer">
          <Button
            type="button"
            onClick={handleClose}
            className="modal-shell-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleLock}
            className="modal-shell-submit-btn"
            disabled={isSubmitting || alreadyLocked}
          >
            {isSubmitting ? <Loader label="" /> : "Lock Project"}
          </Button>
        </div>
      </Container>
    </Modal>
  );
};
