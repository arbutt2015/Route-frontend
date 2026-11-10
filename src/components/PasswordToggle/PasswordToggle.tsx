import styled from "styled-components";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ToggleButton = styled.button<{ $right: number }>`
  position: absolute;
  top: 57%;
  right: ${({ $right }) => $right}px;
  transform: translateY(-50%);
  display: flex;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  z-index: 2;
`;

interface PasswordToggleProps {
  visible: boolean;
  onToggle: () => void;
  label?: string;
  right?: number;
}

const PasswordToggle = ({
  visible,
  onToggle,
  label = "password",
  right = 10,
}: PasswordToggleProps) => (
  <ToggleButton
    type="button"
    $right={right}
    aria-label={`${visible ? "Hide" : "Show"} ${label}`}
    aria-pressed={visible}
    onClick={onToggle}
  >
    {visible ? (
      <IoEye size={18} aria-hidden="true" />
    ) : (
      <IoEyeOff size={18} aria-hidden="true" />
    )}
  </ToggleButton>
);

export default PasswordToggle;
