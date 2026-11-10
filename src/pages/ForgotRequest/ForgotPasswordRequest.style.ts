import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  & .forgot-password-form {
    & .forgot-password-heading {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 30px;
      line-height: 27.65px;
    }
    & .forgot-password-msg {
      font-size: 14px;
      line-height: 17.6px;
    }
    & .forgot-password-form-field {
      height: 90px;
      & .forgot-password-field-label {
        font-weight: 600;
        font-size: 16px;
      }
      & .forgot-password-input-field {
        width: 350px;
      }
    }
    & .forgot-password-footer {
      text-align: left;
      margin-top: 15px;
      & .forgot-btn {
        margin-left: 12px;
        background-color: var(--primary-color);
        border: none;
        height: 38px;
        width: 84px;
        font-weight: 600;
      }
      & .forgot-cancel-btn {
        background-color: #676767;
        border: none;
        height: 38px;
        width: 79px;
        font-weight: 600;
      }
    }
  }
`;
