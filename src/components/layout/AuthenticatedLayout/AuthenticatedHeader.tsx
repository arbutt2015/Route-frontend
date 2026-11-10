import profileIcon from "../../../assets/icons/user-profile.svg";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderActions, HeaderActionHandlers } from "./HeaderActions";
import { Header, ProfileButton } from "./AuthenticatedLayout.style";

export interface AuthenticatedHeaderProps {
  userName: string;
  actions?: HeaderActionHandlers;
  onProfileClick?: () => void;
}

export const AuthenticatedHeader = ({
  userName,
  actions,
  onProfileClick,
}: AuthenticatedHeaderProps) => (
  <Header>
    <HeaderLogo />
    <HeaderActions actions={actions} />
    <ProfileButton
      type="button"
      aria-label={`User profile: ${userName}`}
      onClick={onProfileClick}
    >
      <img src={profileIcon} alt="" aria-hidden="true" />
      <span>{userName}</span>
    </ProfileButton>
  </Header>
);
