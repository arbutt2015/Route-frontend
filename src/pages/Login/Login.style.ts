import styled from "styled-components";

export const LoginContainer = styled.div`
  & .register-form {
    border-right: 2px solid #ededed;
    padding-right: 25px;

    & .register-heading {
      margin-bottom: 29.8px;
      font-size: 22px;
      font-weight: 600;
    }
    & .register-email-field {
      /* width: 350px; */
      height: 90px;
    }
    & .register-btn-section {
      text-align: left;
      & .register-btn {
        background-color: var(--primary-color);
        border: none;
        margin-top: 58px;
        width: 90px;
        height: 36px !important;
        border-radius: 5px !important;
      }
    }
  }
`;
