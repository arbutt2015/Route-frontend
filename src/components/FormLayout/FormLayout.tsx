import { FormLayoutContainer } from "./FormLayout.style";
import { FC } from "react";
import { FormLayoutPropsType } from "../../types";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import useAppState from "../../hooks/useAppState";

export const FormLayout: FC<FormLayoutPropsType> = ({ children }) => {
  const { domainInfo } = useAppState();

  return (
    <FormLayoutContainer>
      <Container className="form-section">
        <Row className="form-logo-section">
          <img src={domainInfo?.logo} className="form-logo" alt="Transconomy Logo" />
        </Row>
        {children}
      </Container>
    </FormLayoutContainer>
  );
};
