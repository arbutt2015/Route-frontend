import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import Loader from "../../components/Loader/Loader";
import { FormLayout } from "../../components/FormLayout/FormLayout";
import { verifyEmailAPI } from "../../api/auth";
import { emailValidationSchema } from "../../validations/validation";
import { ROUTE_NAMES, toastErrMessage } from "../../utils/constant";
import WebStorage from "../../utils/WebStorage";
import useAppState from "../../hooks/useAppState";
import { LoginContainer } from "./Login.style";

const Login = () => {
  const { domainInfo } = useAppState();
  const navigate = useNavigate();
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: { email: "" },
    validationSchema: emailValidationSchema,
    onSubmit: async ({ email }) => {
      const response = await verifyEmailAPI(email);
      if (!response.success) {
        toastErrMessage(response.message);
        return;
      }
      WebStorage.setLocalStore("email", email);
      navigate(
        response.data.shouldBeVerified
          ? ROUTE_NAMES.VERIFICATION
          : ROUTE_NAMES.REGISTRATION,
      );
    },
  });

  return (
    <FormLayout>
      <LoginContainer>
        <Row>
          <Col sm={6}>
            <Form className="register-form" onSubmit={handleSubmit}>
              <p className="register-heading">Register</p>
              <Form.Group
                className="mb-1 register-email-field"
                controlId="formBasicEmailRegister"
              >
                <Form.Label className="form-field-label required">
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="abc@xyz.com"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && Boolean(errors.email)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <p style={{ fontSize: "14px" }}>
                If you are not registered with {domainInfo?.companyName}, you
                can
                <br /> create your {domainInfo?.companyName} account.
              </p>
              <div className="register-btn-section">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "var(--primary-color)" }}
                  className="register-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader label="" /> : "Register"}
                </Button>
              </div>
            </Form>
          </Col>
          <Col sm={6}>
            <LoginForm />
          </Col>
        </Row>
      </LoginContainer>
    </FormLayout>
  );
};

export default Login;
