import styled from "styled-components";

export const Container = styled.div`
  & .email-verification-heading {
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 22px;
  }
  & .verification-form-field {
    font-weight: 600;
    height: 90px;
    width: 375px;

    & .verification-code-field-label {
      display: flex;
      justify-content: space-between;

      & .field-label {
        font-weight: 600;
        font-size: 16px;
      }
    }
    & .verification-code-sec {
      display: flex;
      width: 480px;
      align-items: baseline;
      & .resend-code-loader {
        color: var(--primary-color);
      }
      & .resend-code {
        border: none;
        background-color: transparent;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-color);
      }
    }
    & .verification-field-error {
      font-weight: normal !important;
    }
  }
  & .error-message-section-verification {
    color: var(--error-message-color);
    font-size: 0.875em;
    height: 20px;
    margin-top: -30px;
  }
  & .verification-footer {
    text-align: left;
    margin-top: 20px;
    & .verify-cancel-btn {
      background-color: #676767;
      border: none;
      width: 79px;
      height: 38px;
    }
    & .verify-btn {
      margin-left: 12px;
      background-color: var(--primary-color);
      border: none;
      width: 111px;
      height: 38px;
    }
  }
  & .verify-error-section {
    height: 20px;
    margin-top: -17px;
    color: #dc3545;
    font-size: 0.875em;
  }
  & .register-successfully {
    color: green;
    /* margin-top: 30px; */
    height: 26px;
    & .click-here-btn {
      border: none;
      background-color: transparent;
      color: var(--primary-color);
      font-weight: 600;
    }
  }
`;
