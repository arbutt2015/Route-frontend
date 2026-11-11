import Modal from "react-bootstrap/Modal";
import { useEffect, useMemo, useState } from "react";
import { Container } from "./ProjectModal.style";
import ScrollBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { assignDemoProject, getAssignedProjects } from "../../api/projects";
import { toastErrMessage } from "../../utils/constant";
import useAppState from "../../hooks/useAppState";
import Loader from "../Loader/Loader";
import { GoDotFill } from "react-icons/go";
import { Button, Form } from "react-bootstrap";
import WebStorage from "../../utils/WebStorage";
import closeIcon from "../../assets/images/close-icon-btn.png";
import type {
  IProjectModalProps,
  ISelectedProject,
  ReturnProject,
} from "../../types";

export const ProjectModal = ({
  show,
  handleClose,
  onCreateProject,
  onProjectOpened,
}: IProjectModalProps) => {
  const [projects, setProjects] = useState<ReturnProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
  const { user, domainInfo } = useAppState();
  const [isNewUser, setIsNewUser] = useState<boolean>(
    WebStorage.getLocalStore<boolean>("isNewUser") ?? false,
  );

  const handleOnClick = (project: ISelectedProject) => {
    setSelectedProjectId(project?.projectId);
  };

  const openProject = () => {
    const projectData = projects?.find(
      (p) => p.project.projectId === selectedProjectId,
    );
    if (!projectData) {
      toastErrMessage("Project not selected.");
      return;
    }
    WebStorage.setLocalStore("selectedProject", projectData.project);
    if (onProjectOpened) {
      onProjectOpened();
    } else {
      handleClose();
    }
  };

  const handleAssignDemo = async () => {
    setIsLoading(true);
    try {
      const res = await assignDemoProject({ userId: user?.userId });
      if (res.success) {
        setIsNewUser(false);
        WebStorage.setLocalStore("isNewUser", false);
        WebStorage.setLocalStore("anyUserAssignedProject", true);
      } else {
        toastErrMessage("An error occurred while assigning demo project.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getUserProjects = async () => {
      setIsLoading(true);
      try {
        const res = await getAssignedProjects();
        if (res.success && res.data) {
          setProjects(res.data);
        } else {
          toastErrMessage(
            res.message ||
              "An error occurred while getting user projects.",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    void getUserProjects();
  }, [isNewUser]);

  useEffect(() => {
    const selectedProject =
      WebStorage.getLocalStore<ISelectedProject>("selectedProject");
    setSelectedProjectId(selectedProject?.projectId ?? 0);
  }, []);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter((project) => {
      const projectNumber = project.project.projectNumber?.toLowerCase() || "";
      const projectName = project.project.projectName?.toLowerCase() || "";
      return projectNumber.includes(query) || projectName.includes(query);
    });
  }, [projects, searchQuery]);

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      {isNewUser ? (
        <Container>
          <div className="project-modal-header">
            <p className="project-modal-label">
              Welcome to {domainInfo?.companyName} Roadmap
            </p>
          </div>
          <div className="new-user-body">
            <div className="new-user-msg">
              <p>
                Thank you for registering with {domainInfo?.companyName}{" "}
                Roadmap. {domainInfo?.companyName} Roadmap an AI-assisted
                platform for transportation infrastructure asset inventory
                extraction. It provides an end-to-end solution for GIS-based
                asset inventory management.
              </p>
              <p>
                Explore {domainInfo?.companyName} Roadmap roadway asset data for
                a sample project. Please contact {domainInfo?.companyName} at
                (703) 722-2980 or email sales@transconomy.com to talk to a
                transportation infrastructure expert to discuss how{" "}
                {domainInfo?.companyName} can help manage inventory and
                decision-making for your organization.
              </p>
            </div>
            <div className="new-user-btn">
              <Button
                onClick={handleAssignDemo}
                style={{
                  backgroundColor: "var(--primary-color)",
                  border: "none",
                  width: "100px",
                  height: "39px",
                }}
              >
                {isLoading ? <Loader label="" /> : "   Explore"}
              </Button>
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="project-modal-header">
          <p className="project-modal-label">Open Project</p>
          <button
            type="button"
            className="project-modal-close-btn"
            onClick={handleClose}
            aria-label="Close open project"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <div className="project-modal-content">
          {projects.length > 0 && (
            <div style={{ padding: "10px 10px 5px 10px" }}>
              <Form.Control
                type="text"
                placeholder="Find project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: "14px" }}
              />
            </div>
          )}
          <ScrollBar className="project-modal-scrollbar">
            {isLoading ? (
              <div className="project-modal-loader-sec">
                <Loader label="" />
              </div>
            ) : (
              <>
                {filteredProjects.length > 0 ? (
                  <>
                    {filteredProjects
                      .sort((a, b) =>
                        a.project.projectNumber
                          .toLowerCase()
                          .localeCompare(
                            b.project.projectNumber.toLowerCase(),
                          ),
                      )
                      ?.map((p: ReturnProject, index) => (
                        <button
                          className={`project-modal-list home-page-project-list-item hidden-btn ${
                            p.project.projectId === selectedProjectId
                              ? "active-project"
                              : ""
                          }`}
                          key={index}
                          onClick={() => handleOnClick(p.project)}
                        >
                          <GoDotFill
                            size={18}
                            style={{
                              margin: "1px 2px 0px 0px",
                              color: "var(--primary-color)",
                            }}
                          />
                          {`${p.project?.projectNumber} - ${p.project?.projectName}`}
                        </button>
                      ))}
                  </>
                ) : (
                  <div style={{ padding: "10px" }}>
                    {searchQuery
                      ? "No matching projects found."
                      : "No project assigned to you"}
                  </div>
                )}
              </>
            )}
          </ScrollBar>
        </div>
        <div className="project-modal-footer">
          <Button
            type="button"
            className="project-modal-create-project-btn"
            onClick={onCreateProject}
          >
            Create New Project
          </Button>
          <div className="project-modal-footer-actions">
            <Button
              type="button"
              onClick={handleClose}
              className="project-modal-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={openProject}
              className="project-modal-open-project-btn"
              disabled={selectedProjectId === 0}
            >
              Open Project
            </Button>
          </div>
        </div>
        </Container>
      )}
    </Modal>
  );
};
