import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  & .forgot-password-form {
    width: 400px;
    & .forgot-password-form-field {
      height: 90px;
      font-weight: normal;
      & .forgot-password-input-form-field {
        width: 350px;
      }
    }
    & .forgot-password-heading {
      text-align: left;
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 30px;
    }
    & .error-message-sec-forgot {
      color: var(--error-message-color);
      font-size: 0.875em;
      height: 20px;
      margin-top: 0;
    }
    & .forgot-password-footer {
      text-align: left;
      margin-top: 10px;
      & .forgot-btn {
        margin-left: 15px;
        background-color: var(--primary-color);
        border: none;
        width: 90px;
        height: 36px;
      }
      & .forgot-cancel-btn {
        background-color: #676767;
        border: none;
      }
    }
  }
  & .success-message {
    display: flex;
    flex-direction: column;
    & .forgot-password-heading {
      text-align: left;
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 30px;
    }
  }
`;
