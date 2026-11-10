import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  & .forgot-password-form {
    width: 400px;
    & .forgot-password-form-field {
      font-weight: 600;
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
      margin-top: -30px;
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
    & .reset-password-successfully {
      height: 26px;
      color: green;
      & .click-here-btn {
        border: none;
        background-color: transparent;
        color: var(--primary-color);
        font-weight: 600;
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
