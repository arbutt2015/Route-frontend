import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { registerAPI } from "../../api/auth";
import { ROUTE_NAMES, toastErrMessage } from "../../utils/constant";
import { useFormik } from "formik";
import { registrationValidationSchema } from "../../validations/validation";
import Loader from "../../components/Loader/Loader";
import { FormLayout } from "../../components/FormLayout/FormLayout";
import { useNavigate } from "react-router-dom";
import WebStorage from "../../utils/WebStorage";
import { RegistrationContainer } from "./RegistrationForm.style";
import useAppState from "../../hooks/useAppState";
import { validationRules } from "../../utils/constant";
import { useState } from "react";
import PasswordToggle from "../../components/PasswordToggle/PasswordToggle";

const Registration = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const { domainInfo } = useAppState();

  const userEmail = WebStorage.getLocalStore("email") ?? "";
  const initialValues = {
    email: userEmail,
    firstName: "",
    middleInitial: "",
    lastName: "",
    companyName: "",
    title: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    isSdUser: false,
  };

  const {
    isSubmitting,
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: registrationValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await registerAPI({ ...values, isVerified: false });
        if (response.success) {
          navigate(ROUTE_NAMES.VERIFICATION);
        } else if (!response.success) {
          toastErrMessage("An error occurred while processing your request.");
        }
      } catch (error) {
        toastErrMessage("An error occurred while processing your request.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCancel = () => {
    navigate(ROUTE_NAMES.LOGIN);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFieldValue("agreeToTerms", checked);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };
  return (
    <FormLayout>
      <RegistrationContainer className="register-form-tab">
        <p className="register-heading">Register your account</p>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-0">
            <Col sm="6">
              <Form.Group
                controlId="formPlaintextEmail"
                className="registration-field"
              >
                <Form.Label className="form-field-label required">
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  readOnly
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-0">
            <Col sm="4">
              <Form.Group
                controlId="formPlaintextFirstName"
                className="registration-field"
              >
                <Form.Label className="required">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.firstName && touched.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group
                controlId="formPlaintextMiddleInitial"
                className="registration-field"
              >
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Middle name"
                  name="middleInitial"
                  value={values.middleInitial}
                  onBlur={handleBlur}
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group
                controlId="formPlaintextLastName"
                className="registration-field"
              >
                <Form.Label className="required">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.lastName && touched.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-0">
            <Col sm="6">
              <Form.Group
                controlId="formPlaintextCompanyName"
                className="registration-field"
              >
                <Form.Label className="required">Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company name"
                  name="companyName"
                  value={values.companyName}
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.companyName && touched.companyName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-0">
            <Col sm="6">
              <Form.Group
                controlId="formPlaintextTitle"
                className="registration-field"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Col>
            <Col sm="6">
              <Form.Group
                controlId="formPlaintextPhoneNumber"
                className="registration-field"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="6">
              <Form.Group
                controlId="formPlaintextPassword"
                className="registration-field"
                style={{
                  marginBottom: values.password.length > 0 ? "-17px" : "",
                  position: "relative",
                }}
              >
                <Form.Label className="required">Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  style={{ backgroundImage: "none" }}
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  isInvalid={!!errors.password && touched.password}
                />
                {values.password && (
                  <PasswordToggle
                    visible={showPassword}
                    onToggle={() => setShowPassword((value) => !value)}
                  />
                )}
                {errors.password === "Password is required." && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              {values.password.length > 0 && (
                <div>
                  {validationRules.map(({ regex, message }, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: "-5px",
                        color: regex.test(values.password) ? "green" : "red",
                      }}
                    >
                      {regex.test(values.password) ? "✔" : "✖"} {message}
                    </div>
                  ))}
                </div>
              )}
            </Col>
            <Col sm="6">
              <Form.Group
                controlId="formPlaintextConfirmPassword"
                className="registration-field"
                style={{ position: "relative" }}
              >
                <Form.Label className="required">Confirm Password</Form.Label>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  style={{ backgroundImage: "none" }}
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                />
                {values.confirmPassword && (
                  <PasswordToggle
                    label="confirm password"
                    visible={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword((value) => !value)}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-1">
            <p style={{ textAlign: "justify", fontSize: "14px" }}>
              By creating a {domainInfo?.companyName} account and agreeing to
              these terms and conditions, you are granting{" "}
              {domainInfo?.companyName}
              permission to contact you via email to inform you about{" "}
              {domainInfo?.companyName} products and services. In addition, your
              information will be added to the {domainInfo?.companyName}{" "}
              database, which will be used to periodically send you marketing
              communications.
            </p>
          </Row>
          <Col sm="6" style={{ marginBottom: "30px" }}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label={
                  <>
                    I agree to the terms and conditions{" "}
                    <span style={{ color: "red", fontSize: "18px" }}>*</span>
                  </>
                }
                onChange={handleCheckboxChange}
                isInvalid={!!errors.agreeToTerms && touched.agreeToTerms}
              />
              <Form.Control.Feedback type="invalid">
                {errors.agreeToTerms}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Row className="registration-btn-sec">
            <Button
              type="button"
              className="registration-btn"
              onClick={handleCancel}
              style={{ background: "#676767", width: "90px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="registration-btn"
              style={{ background: "var(--primary-color)" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader label="" /> : "Register Account"}
            </Button>
          </Row>
        </Form>
      </RegistrationContainer>
    </FormLayout>
  );
};

export default Registration;
