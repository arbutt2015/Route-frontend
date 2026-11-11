import Modal from "react-bootstrap/Modal";
import { Container } from "../CreateProject/CreateProjectModal.style";
import { Button } from "react-bootstrap";
import { FiCopy } from "react-icons/fi";
import WebStorage from "../../utils/WebStorage";
import { toastSuccessMessage } from "../../utils/constant";
import closeIcon from "../../assets/images/close-icon-btn.png";
import type { ISelectedProject } from "../../types";

export interface IRouteCodeModalProps {
  show: boolean;
  handleClose: () => void;
}

export const RouteCodeModal = ({
  show,
  handleClose,
}: IRouteCodeModalProps) => {
  const project =
    WebStorage.getLocalStore<ISelectedProject>("selectedProject");
  const routeCode = project?.routeCode ?? "ABC123";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(routeCode);
      toastSuccessMessage("Route code copied to clipboard.");
    } catch {
      toastSuccessMessage(routeCode);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Container>
        <div className="modal-shell-header">
          <p className="modal-shell-label">Route Mobile App Code</p>
          <button
            type="button"
            className="modal-shell-close-btn"
            onClick={handleClose}
            aria-label="Close route mobile app code"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <p>
          Open the Transconomy Route mobile application on your device and enter
          the following code to access this project:
        </p>
        <div className="route-code-display">{routeCode}</div>
        <div className="modal-shell-footer">
          <Button
            type="button"
            onClick={handleClose}
            className="modal-shell-cancel-btn"
          >
            Close
          </Button>
          <Button
            type="button"
            onClick={handleCopy}
            className="modal-shell-submit-btn"
          >
            <FiCopy style={{ marginRight: "8px" }} />
            Copy Code
          </Button>
        </div>
      </Container>
    </Modal>
  );
};
