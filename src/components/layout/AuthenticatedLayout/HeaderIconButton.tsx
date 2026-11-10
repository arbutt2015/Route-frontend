import { ReactNode } from "react";
import { ActionButton, Badge } from "./AuthenticatedLayout.style";

export interface HeaderIconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string | number;
}

export const HeaderIconButton = ({ icon, label, onClick, disabled, badge }: HeaderIconButtonProps) => (
  <ActionButton type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled}>
    {icon}
    <span>{label}</span>
    {badge !== undefined && <Badge aria-label={`${badge} notifications`}>{badge}</Badge>}
  </ActionButton>
);
