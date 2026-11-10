import styled from "styled-components";

export const FormLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh !important;
  background: #e0e0e0;
  & .form-section {
    background-color: white;
    padding: 40px;
    width: auto;
    margin: 50px 0px;
    border-radius: 10px;
    min-width: 810px;
    & .form-logo-section {
      display: flex;
      justify-content: center;
      & .form-logo {
        width: auto;
        margin-bottom: 40px;
        max-height: 80px;
      }
    }
  }
`;
