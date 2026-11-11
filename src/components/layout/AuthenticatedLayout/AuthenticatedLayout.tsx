import { lazy, Suspense, useCallback, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { logoutUser } from "../../../utils/helper";
import "@fontsource/source-sans-pro/latin-400.css";
import "@fontsource/source-sans-pro/latin-600.css";
import useAppState from "../../../hooks/useAppState";
import WebStorage from "../../../utils/WebStorage";
import { ProjectModal } from "../../ProjectsModal/ProjectModal";
import { CreateProjectModal } from "../../CreateProject/CreateProjectModal";
import { ProjectDetailsModal } from "../../ProjectDetails/ProjectDetailsModal";
import { LockProjectModal } from "../../LockProject/LockProjectModal";
import { RouteCodeModal } from "../../RouteCode/RouteCodeModal";
import type { ISelectedProject } from "../../../types";
import {
  AuthenticatedHeader,
  AuthenticatedHeaderProps,
} from "./AuthenticatedHeader";
import {
  ApplicationShell,
  PageContent,
  SelectedProjectBar,
} from "./AuthenticatedLayout.style";

const UpdateProfile = lazy(() =>
  import("../../Profile/UpdateProfile").then((module) => ({
    default: module.UpdateProfile,
  })),
);

export interface AuthenticatedOutletContext {
  openProjectModal: () => void;
  openCreateProjectModal: () => void;
}

export const useAuthenticatedOutletContext = () =>
  useOutletContext<AuthenticatedOutletContext>();

type AuthenticatedLayoutProps = Pick<AuthenticatedHeaderProps, "actions">;

export const AuthenticatedLayout = ({ actions }: AuthenticatedLayoutProps) => {
  const { user } = useAppState();
  const [profileOpen, setProfileOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false);
  const [lockProjectOpen, setLockProjectOpen] = useState(false);
  const [routeCodeOpen, setRouteCodeOpen] = useState(false);
  const [openedProject, setOpenedProject] = useState<ISelectedProject | null>(
    () => WebStorage.getLocalStore<ISelectedProject>("selectedProject"),
  );
  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "User";

  const openProjectModal = useCallback(() => {
    setCreateProjectOpen(false);
    setProjectModalOpen(true);
  }, []);

  const openCreateProjectModal = useCallback(() => {
    setProjectModalOpen(false);
    setCreateProjectOpen(true);
  }, []);

  const closeCreateProjectModal = useCallback(() => {
    setCreateProjectOpen(false);
    if (!WebStorage.getLocalStore("selectedProject")) {
      setProjectModalOpen(true);
    }
  }, []);

  const refreshSelectedProject = useCallback(
    () =>
      setOpenedProject(
        WebStorage.getLocalStore<ISelectedProject>("selectedProject"),
      ),
    [],
  );

  const openProjectDetailsModal = useCallback(() => {
    if (!WebStorage.getLocalStore("selectedProject")) return;
    setProjectModalOpen(false);
    setCreateProjectOpen(false);
    refreshSelectedProject();
    setProjectDetailsOpen(true);
  }, [refreshSelectedProject]);

  const handleProjectOpened = useCallback(() => {
    setProjectModalOpen(false);
    refreshSelectedProject();
  }, [refreshSelectedProject]);

  const openLockProjectModal = useCallback(() => {
    if (WebStorage.getLocalStore("selectedProject")) {
      setLockProjectOpen(true);
    }
  }, []);

  const openRouteCodeModal = useCallback(() => {
    if (WebStorage.getLocalStore("selectedProject")) {
      setRouteCodeOpen(true);
    }
  }, []);

  return (
    <ApplicationShell>
      <AuthenticatedHeader
        userName={userName}
        onUpdateProfile={() => setProfileOpen(true)}
        onLogout={logoutUser}
        actions={{
          open: openProjectModal,
          new: openCreateProjectModal,
          details: openProjectDetailsModal,
          lock: openLockProjectModal,
          routeCode: openRouteCodeModal,
          ...actions,
        }}
        disabledActions={{
          details: !openedProject,
          lock: !openedProject,
          routeCode: !openedProject,
        }}
      />
      {openedProject && (
        <SelectedProjectBar>
          {`${openedProject.projectNumber} - ${openedProject.projectName}`}
        </SelectedProjectBar>
      )}
      <PageContent id="main-content">
        <Outlet context={{ openProjectModal, openCreateProjectModal }} />
      </PageContent>
      {profileOpen && (
        <Suspense fallback={null}>
          <UpdateProfile onClose={() => setProfileOpen(false)} />
        </Suspense>
      )}
      {projectModalOpen && (
        <ProjectModal
          show={projectModalOpen}
          handleClose={() => setProjectModalOpen(false)}
          onCreateProject={openCreateProjectModal}
          onProjectOpened={handleProjectOpened}
        />
      )}
      {projectDetailsOpen && (
        <ProjectDetailsModal
          show={projectDetailsOpen}
          handleClose={() => setProjectDetailsOpen(false)}
          onUpdated={refreshSelectedProject}
        />
      )}
      {lockProjectOpen && (
        <LockProjectModal
          show={lockProjectOpen}
          handleClose={() => setLockProjectOpen(false)}
        />
      )}
      {routeCodeOpen && (
        <RouteCodeModal
          show={routeCodeOpen}
          handleClose={() => setRouteCodeOpen(false)}
        />
      )}
      {createProjectOpen && (
        <CreateProjectModal
          show={createProjectOpen}
          handleClose={closeCreateProjectModal}
        />
      )}
    </ApplicationShell>
  );
};
