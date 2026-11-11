import Dropdown from "react-bootstrap/Dropdown";
import profileIcon from "../../../assets/icons/user-profile.svg";
import { HeaderLogo } from "./HeaderLogo";
import {
  HeaderActions,
  HeaderActionDisabled,
  HeaderActionHandlers,
} from "./HeaderActions";
import {
  Header,
  ProfileButton,
  ProfileMenu,
} from "./AuthenticatedLayout.style";

export interface AuthenticatedHeaderProps {
  userName: string;
  actions?: HeaderActionHandlers;
  disabledActions?: HeaderActionDisabled;
  onUpdateProfile: () => void;
  onLogout: () => void;
}

export const AuthenticatedHeader = ({
  userName,
  actions,
  disabledActions,
  onUpdateProfile,
  onLogout,
}: AuthenticatedHeaderProps) => (
  <Header>
    <HeaderLogo />
    <HeaderActions actions={actions} disabledActions={disabledActions} />
    <ProfileMenu align="end">
      <Dropdown.Toggle
        as={ProfileButton}
        id="profile-menu"
        aria-label={`User profile: ${userName}`}
      >
        <img src={profileIcon} alt="" aria-hidden="true" />
        <span>{userName}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu role="menu">
        <Dropdown.Item as="button" role="menuitem" onClick={onUpdateProfile}>
          Update profile
        </Dropdown.Item>
        <Dropdown.Item as="button" role="menuitem" onClick={onLogout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </ProfileMenu>
  </Header>
);
