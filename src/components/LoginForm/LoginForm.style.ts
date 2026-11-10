import styled from "styled-components";

export const LoginFormContainer = styled.div`
  & .login-form {
    & .login-heading {
      font-weight: 600;
      margin-bottom: 29.8px;
      font-size: 22px;
    }
    & .login-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30.2px;
      & .forgot-password-link {
        color: var(--primary-color) !important;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
      }
      & .login-btn {
        background-color: var(--primary-color);
        border: none;
        width: 90px;
        height: 36px !important;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
`;
