import { Outlet } from "react-router-dom";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/600.css";
import useAppState from "../../../hooks/useAppState";
import { AuthenticatedHeader, AuthenticatedHeaderProps } from "./AuthenticatedHeader";
import { ApplicationShell, PageContent } from "./AuthenticatedLayout.style";

type AuthenticatedLayoutProps = Pick<AuthenticatedHeaderProps, "actions" | "onProfileClick">;

export const AuthenticatedLayout = (props: AuthenticatedLayoutProps) => {
  const { user } = useAppState();
  const userName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "User";

  return (
    <ApplicationShell>
      <AuthenticatedHeader userName={userName} {...props} />
      <PageContent id="main-content">
        <Outlet />
      </PageContent>
    </ApplicationShell>
  );
};
