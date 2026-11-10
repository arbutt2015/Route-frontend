import styled from "styled-components";
interface Props {
  color?: string;
}

export const LoaderContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  .loading-text {
    font-weight: 600;
    font-size: 16px !important;
    margin-left: 5px;
  }
`;
