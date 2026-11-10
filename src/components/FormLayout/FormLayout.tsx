import { FormLayoutContainer } from "./FormLayout.style";
import type { PropsWithChildren } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import useAppState from "../../hooks/useAppState";

export const FormLayout = ({ children }: PropsWithChildren) => {
  const { domainInfo } = useAppState();

  return (
    <FormLayoutContainer>
      <Container className="form-section">
        <Row className="form-logo-section">
          <img
            src={domainInfo?.logo}
            className="form-logo"
            alt="Transconomy Logo"
          />
        </Row>
        {children}
      </Container>
    </FormLayoutContainer>
  );
};
