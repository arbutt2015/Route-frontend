import styled from "styled-components";

export const ErrorFallbackContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & .error-heading {
    font-size: 32px;
    font-weight: bold;
  }
  & p {
    font-size: 18px;
  }
  & button {
    background-color: var(--primary-color);
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 18px;
    color: white;
    margin-top: 20px;
  }
`;
