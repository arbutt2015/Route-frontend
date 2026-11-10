import styled from "styled-components";
import Modal from "react-bootstrap/Modal";

export const ProfileModal = styled(Modal)<{ $passwordView: boolean }>`
  font-family: "Source Sans Pro", sans-serif;
  color: #111;

  .modal-dialog {
    max-width: ${({ $passwordView }) => ($passwordView ? "500px" : "960px")};
    width: calc(100% - 32px);
    margin: 24px auto;
  }

  .modal-content {
    border: 0;
    border-radius: 8px;
    box-shadow: 0 4px 24px #00000020;
  }

  .modal-header {
    justify-content: space-between;
    border: 0;
    padding: 24px 28px 20px;
  }

  .modal-title {
    font-size: 22px;
    font-weight: 600;
  }
  .modal-body {
    padding: 8px 28px 28px;
  }
  .form-label {
    margin-bottom: 8px;
  }
  .form-control {
    min-height: 36px;
    font-size: 16px;
  }
  .form-control:disabled {
    background: #e9ecef;
  }

  .profile-close {
    display: flex;
    border: 0;
    background: transparent;
    color: #ff315f;
    padding: 4px;
  }

  .profile-loading {
    display: flex;
    justify-content: center;
    padding: 60px 0;
  }
  .password-field {
    position: relative;
    min-height: 90px;
  }

  .change-password-button {
    background: var(--secondary-color);
    border-color: var(--secondary-color);
  }

  .profile-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 28px;
  }

  .profile-footer .btn {
    min-width: 90px;
    border: 0;
  }
  .profile-footer .btn-secondary {
    background: var(--cancel-color);
  }
  .profile-footer .btn-primary {
    background: var(--primary-color);
    min-width: 120px;
  }

  @media (max-width: 575px) {
    .modal-header {
      padding: 20px 20px 12px;
    }
    .modal-body {
      padding: 8px 20px 20px;
    }
  }
`;
