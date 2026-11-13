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
  const isLocked = !!project?.isLocked;
  const isDownloaded = !!project?.isDownloaded;

  const handleToggleLock = async (lock: boolean) => {
    if (!project) {
      handleClose();
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await updateProjectApi({
        projectId: project.projectId,
        isLocked: lock,
      });
      if (!res.success) {
        toastErrMessage(
          res.message ||
            `Could not ${lock ? "lock" : "unlock"} the project.`,
        );
        return;
      }
      WebStorage.setLocalStore("selectedProject", {
        ...project,
        isLocked: lock,
      });
      toastSuccessMessage(
        `Project ${lock ? "locked" : "unlocked"} successfully.`,
      );
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = isDownloaded
    ? "Project Downloaded"
    : isLocked
      ? "Unlock Project?"
      : "Lock Project?";

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Container>
        <div className="modal-shell-header">
          <p className="modal-shell-label">{title}</p>
          <button
            type="button"
            className="modal-shell-close-btn"
            onClick={handleClose}
            aria-label="Close lock project"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        {isDownloaded ? (
          <p
            style={{
              color: "var(--error-message-color)",
              fontWeight: 600,
            }}
          >
            The project data is being used by the mobile application for
            collection and it cannot be unlocked.
          </p>
        ) : isLocked ? (
          <>
            <p>
              This project is currently locked. You can unlock it to make
              changes, but only before it has been downloaded in the
              Transconomy Route mobile application.
            </p>
            <p>Unlocking will make the project editable again.</p>
          </>
        ) : (
          <>
            <p>
              Once locked, this project cannot be edited. You can unlock it to
              make changes, but only before it has been downloaded in the
              Transconomy Route mobile application.
            </p>
            <p>
              Locked projects will be available to open in the mobile
              application using the Route Code.
            </p>
          </>
        )}

        <div className="modal-shell-footer">
          <Button
            type="button"
            onClick={handleClose}
            className="modal-shell-cancel-btn"
          >
            Cancel
          </Button>
          {!isDownloaded && (
            <Button
              type="button"
              onClick={() => handleToggleLock(!isLocked)}
              className="modal-shell-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader label="" />
              ) : isLocked ? (
                "Unlock Project"
              ) : (
                "Lock Project"
              )}
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  );
};
