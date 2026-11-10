import { lazy, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { logoutUser } from "../../../utils/helper";
import "@fontsource/source-sans-pro/latin-400.css";
import "@fontsource/source-sans-pro/latin-600.css";
import useAppState from "../../../hooks/useAppState";
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

type AuthenticatedLayoutProps = Pick<AuthenticatedHeaderProps, "actions">;

export const AuthenticatedLayout = (props: AuthenticatedLayoutProps) => {
  const { user } = useAppState();
  const [profileOpen, setProfileOpen] = useState(false);
  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "User";

  return (
    <ApplicationShell>
      <AuthenticatedHeader
        userName={userName}
        onUpdateProfile={() => setProfileOpen(true)}
        onLogout={logoutUser}
        {...props}
      />
      <PageContent id="main-content">
        <Outlet />
      </PageContent>
      {profileOpen && (
        <Suspense fallback={null}>
          <UpdateProfile onClose={() => setProfileOpen(false)} />
        </Suspense>
      )}
    </ApplicationShell>
  );
};
