import styled from "styled-components";

export const RegistrationContainer = styled.div`
  width: 800px;
  & .register-heading {
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 22px;
  }
  & .registration-field {
    height: 90px;
    font-weight: 600;
  }
  & .registration-btn-sec {
    display: flex;
    justify-content: left;
    padding-left: 2px;
    & .registration-btn {
      width: 148px;
      margin-left: 10px;
      border: none;
      margin-right: 5px !important;
      height: 38px !important;
    }
  }
`;
