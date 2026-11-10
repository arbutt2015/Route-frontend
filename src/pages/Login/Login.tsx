import { useState, ChangeEvent } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "../../components/LoginForm/LoginForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { verifyEmailAPI } from "../../api/auth";
import Loader from "../../components/Loader/Loader";
import { useFormik } from "formik";
import { emailValidationSchema } from "../../validations/validation";
import { FormLayout } from "../../components/FormLayout/FormLayout";
import { LoginContainer } from "./Login.style";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES, toastErrMessage } from "../../utils/constant";
import WebStorage from "../../utils/WebStorage";
import useAppState from "../../hooks/useAppState";

const Login = () => {
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const { domainInfo } = useAppState();
  const navigate = useNavigate();

  const { errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldTouched } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      setIsValidating(true);
      try {
        const response = await verifyEmailAPI(values.email);
        if (response.success && !response.data?.shouldBeVerified) {
          WebStorage.setLocalStore("email", values.email);
          navigate(ROUTE_NAMES.REGISTRATION);
        } else {
          if (response?.data?.shouldBeVerified) {
            WebStorage.setLocalStore("email", values.email);
            navigate(ROUTE_NAMES.VERIFICATION);
          } else {
            toastErrMessage(response.message);
          }
        }
      } catch (error) {
        toastErrMessage("An error occurred while processing your requests.");
      } finally {
        setIsValidating(false);
      }
    },
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmailTouched(!isEmailTouched);

    handleChange(e);
  };

  const handleSetEmailTouched = (val: boolean) => {
    setFieldTouched("email", val);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEmailTouched(!isEmailTouched);

    handleBlur(e);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailTouched(!isEmailTouched);
    handleSubmit();
  };

  return (
    <FormLayout>
      <LoginContainer>
        <Row>
          <Col sm={6}>
            <Form className="register-form" onSubmit={handleOnSubmit}>
              <p className="register-heading">Register</p>
              <Form.Group className="mb-1 register-email-field" controlId="formBasicEmailRegister">
                <Form.Label className="form-field-label required">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="abc@xyz.com"
                  name="email"
                  value={values.email}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  isInvalid={touched.email && !!errors.email ? true : false}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <p style={{ fontSize: "14px" }}>
                If you are not registered with {domainInfo?.companyName}, you can
                <br /> create your {domainInfo?.companyName} account.
              </p>
              <div className="register-btn-section">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "var(--primary-color)" }}
                  className="register-btn"
                  disabled={isValidating}
                >
                  {isValidating ? <Loader label="" /> : "Register"}
                </Button>
              </div>
            </Form>
          </Col>
          <Col sm={6}>
            <LoginForm handleSetEmailTouched={handleSetEmailTouched} isEmailTouched={isEmailTouched} />
          </Col>
        </Row>
      </LoginContainer>
    </FormLayout>
  );
};

export default Login;
