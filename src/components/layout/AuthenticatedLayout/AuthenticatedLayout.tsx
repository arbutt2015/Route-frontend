import { lazy, Suspense, useCallback, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { logoutUser } from "../../../utils/helper";
import "@fontsource/source-sans-pro/latin-400.css";
import "@fontsource/source-sans-pro/latin-600.css";
import useAppState from "../../../hooks/useAppState";
import { ProjectModal } from "../../ProjectsModal/ProjectModal";
import {
  AuthenticatedHeader,
  AuthenticatedHeaderProps,
} from "./AuthenticatedHeader";
import { ApplicationShell, PageContent } from "./AuthenticatedLayout.style";

const UpdateProfile = lazy(() =>
  import("../../Profile/UpdateProfile").then((module) => ({
    default: module.UpdateProfile,
  })),
);

export interface AuthenticatedOutletContext {
  openProjectModal: () => void;
}

export const useAuthenticatedOutletContext = () =>
  useOutletContext<AuthenticatedOutletContext>();

type AuthenticatedLayoutProps = Pick<AuthenticatedHeaderProps, "actions">;

export const AuthenticatedLayout = ({ actions }: AuthenticatedLayoutProps) => {
  const { user } = useAppState();
  const [profileOpen, setProfileOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "User";

  const openProjectModal = useCallback(() => setProjectModalOpen(true), []);

  return (
    <ApplicationShell>
      <AuthenticatedHeader
        userName={userName}
        onUpdateProfile={() => setProfileOpen(true)}
        onLogout={logoutUser}
        actions={{ open: openProjectModal, ...actions }}
      />
      <PageContent id="main-content">
        <Outlet context={{ openProjectModal }} />
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
        />
      )}
    </ApplicationShell>
  );
};
