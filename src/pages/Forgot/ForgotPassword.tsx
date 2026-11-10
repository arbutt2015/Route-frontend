import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FormLayout } from "../../components/FormLayout/FormLayout";
import { Container } from "./ForgotPassword.style";
import { forgotPasswordFormValidation } from "../../validations/validation";
import Loader from "../../components/Loader/Loader";
import { ROUTE_NAMES, validationRules } from "../../utils/constant";
import { resetPasswordAPI } from "../../api/auth";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

export const ForgotPasswordForm = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const { email } = location.state || {};

  const navigateToOtherPage = (path: string) => navigate(path);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
    validationSchema: forgotPasswordFormValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        isPasswordChanged && setIsPasswordChanged(false);
        const response = await resetPasswordAPI({
          newPassword: values.password,
          email,
          confirmationCode: values.verificationCode,
        });
        if (response.success) {
          setIsPasswordChanged(true);
          resetForm();
        } else {
          setError(response?.message);
        }
      } catch (error) {
        setError("An error occurred while processing your request.");
      }
      setSubmitting(false);
    },
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    handleChange(e);
  };
  return (
    <FormLayout>
      <Container>
        {isPasswordChanged ? (
          <div className="success-message">
            <div>
              <p className="forgot-password-heading">Password reset successfully</p>
              <p style={{ marginBottom: "20px" }}>
                Password has been reset successfully. You can login by providing email and password.
              </p>
            </div>
            <div>
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  navigateToOtherPage(ROUTE_NAMES.LOGIN);
                }}
                style={{ backgroundColor: "var(--primary-color)", border: "none", width: "90px", marginTop: "15px" }}
              >
                Login
              </Button>
            </div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="forgot-password-form">
            <p className="forgot-password-heading">Reset Password</p>
            <Form.Group className="mb-0 forgot-password-form-field" controlId="formBasicPassword">
              <Form.Label className="field-label required">Verification Code</Form.Label>
              <Form.Control
                type="text"
                name="verificationCode"
                value={values.verificationCode}
                placeholder="Enter code here"
                onChange={handleOnChange}
                onBlur={handleBlur}
                isInvalid={touched.verificationCode && !!errors.verificationCode}
                className="forgot-password-input-form-field"
              />
              <Form.Control.Feedback type="invalid">{errors.verificationCode}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="forgot-password-form-field"
              controlId="formBasicPassword"
              style={{ marginBottom: values.password.length > 0 ? "-17px" : "", position: "relative" }}
            >
              <Form.Label className="required field-label">New Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New Password"
                value={values.password}
                onChange={handleOnChange}
                onBlur={handleBlur}
                style={{ backgroundImage: "none" }}
                isInvalid={touched.password && !!errors.password}
                className="forgot-password-input-form-field"
              />
              {values.password && <button className="hidden-btn" style={{
                position: "absolute",
                top: "57%",
                right: "60px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 2,
              }} type="button" onClick={() => setShowPassword(!showPassword)} >
                {!showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
              </button>}

              {errors.password === "Password is required." && (
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              )}
            </Form.Group>
            {values.password.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                {validationRules.map(({ regex, message }, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: "-5px", color: regex.test(values.password) ? "green" : "red" }}
                  >
                    {regex.test(values.password) ? "✔" : "✖"} {message}
                  </div>
                ))}
              </div>
            )}
            <Form.Group style={{ position: "relative" }} className="mb-3 forgot-password-form-field" controlId="formBasicConfirmPassword">
              <Form.Label className="required field-label">Confirm Password</Form.Label>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                style={{ backgroundImage: "none" }}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                className="forgot-password-input-form-field"
              />
              {values.confirmPassword && <button className="hidden-btn" style={{
                position: "absolute",
                top: "57%",
                right: "60px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 2,
              }} type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                {!showConfirmPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
              </button>}
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <p className="reset-password-successfully">
              {isPasswordChanged ? (
                <>
                  <Row>
                    <p style={{ marginBottom: "20px" }}>
                      Your account has been activated successfully. You can login by providing email and password.
                    </p>
                  </Row>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      navigateToOtherPage(ROUTE_NAMES.LOGIN);
                    }}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      border: "none",
                      width: "90px",
                      marginTop: "15px",
                    }}
                  >
                    Login
                  </Button>
                </>
              ) : (
                ""
              )}
            </p>
            <p className="error-message-sec-forgot">{error}</p>
            <div className="forgot-password-footer">
              <Button
                variant="primary"
                type="button"
                onClick={() => navigateToOtherPage(ROUTE_NAMES.LOGIN)}
                className="forgot-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: "var(--primary-color)" }}
                disabled={isSubmitting}
                className="forgot-btn"
              >
                {isSubmitting ? <Loader label="" /> : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </FormLayout>
  );
};
