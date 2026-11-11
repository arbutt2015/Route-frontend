import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

export const ApplicationShell = styled.div`
  --header-height: 96px;
  --header-ink: #222c51;
  --header-border: #e0e0e0;
  --action-width: 48px;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  font-family: "Source Sans Pro", sans-serif;
  color: var(--header-ink);
  background: #ededed;
`;

export const Header = styled.header`
  position: relative;
  z-index: 1;
  min-height: var(--header-height);
  padding: 5px 24px;
  display: flex;
  align-items: center;
  gap: 30px;
  background: #fff;
  border-bottom: 1px solid var(--header-border);
  box-shadow: 0 2px 4px #00000040;

  @media (max-width: 1150px) {
    flex-wrap: wrap;
    gap: 8px 20px;
    padding: 12px 16px;
  }
`;

export const SelectedProjectBar = styled.div`
  background: #104a8e;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  width: 100%;
`;

export const LogoLink = styled.a`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: 196.67px;
  height: 48px;
  img {
    width: 100%;
    height: 100%;
  }
  &:focus-visible {
    outline: 2px solid #146eb4;
    outline-offset: 4px;
  }
`;

export const ActionNavigation = styled.nav`
  display: flex;
  flex-shrink: 0;
  height: 85px;
  @media (max-width: 1150px) {
    order: 3;
    width: 100%;
    overflow-x: auto;
  }
`;

export const ActionGroup = styled.div`
  flex: 0 0 auto;
  width: 379px;
  height: 85px;
  border-left: 1px solid var(--header-border);
  &:last-child {
    border-right: 1px solid var(--header-border);
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px 20px 0;
  height: 68px;
`;

export const GroupCaption = styled.div`
  text-align: center;
  height: 17px;
  font-size: 12px;
  font-weight: 600;
  line-height: 17px;
`;

export const ActionButton = styled.button`
  position: relative;
  flex: 0 0 var(--action-width);
  width: var(--action-width);
  height: 58px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--header-ink);
  font: inherit;
  font-size: 12px;
  line-height: 15px;
  img,
  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
  &:not(:disabled):hover {
    background: #eef6fc;
  }
  &:not(:disabled):active {
    background: #dcecf8;
  }
  &:focus-visible {
    outline: 2px solid #146eb4;
    outline-offset: 2px;
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: 4px;
  min-width: 14px;
  border-radius: 10px;
  background: #b81414;
  color: white;
  font-size: 10px;
  line-height: 14px;
`;

export const ProfileMenu = styled(Dropdown)`
  margin-left: auto;
  flex-shrink: 0;

  .dropdown-menu {
    min-width: 180px;
    border-color: #e0e0e0;
    box-shadow: 0 4px 12px #00000018;
  }

  .dropdown-item {
    padding: 8px 16px;
    font-size: 18px;
  }

  .dropdown-toggle::after {
    display: none;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
  min-height: 42px;
  margin-left: auto;
  padding: 8px 12px;
  border: 1px solid var(--header-border);
  border-radius: 24px;
  background: #fafafa;
  color: #000;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  img {
    width: 24px;
    height: 24px;
  }
  &:hover {
    background: #eef6fc;
  }
  &:active {
    background: #dcecf8;
  }
  &:focus-visible {
    outline: 2px solid #146eb4;
    outline-offset: 2px;
  }
`;

export const PageContent = styled.main`
  flex: 1;
  display: flex;
  min-height: 0;
`;
