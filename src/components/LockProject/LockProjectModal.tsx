import Modal from "react-bootstrap/Modal";
import { Container } from "../CreateProject/CreateProjectModal.style";
import { Button } from "react-bootstrap";
import WebStorage from "../../utils/WebStorage";
import { toastSuccessMessage } from "../../utils/constant";
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
  const handleLock = () => {
    const project =
      WebStorage.getLocalStore<ISelectedProject>("selectedProject");
    if (project) {
      WebStorage.setLocalStore("selectedProject", {
        ...project,
        isLocked: true,
      });
      toastSuccessMessage("Project locked successfully.");
    }
    handleClose();
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
          >
            Lock Project
          </Button>
        </div>
      </Container>
    </Modal>
  );
};
