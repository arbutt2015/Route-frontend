import { useState } from "react";
import { Container } from "./VerificationForm.style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import { verificationCodeAPI } from "../../api/auth";
import { ROUTE_NAMES, toastErrMessage } from "../../utils/constant";
import Loader from "../../components/Loader/Loader";
import { useFormik } from "formik";
import { reSendVerificationCodeAPI } from "../../api/auth";
import { VerificationFormValidationSchema } from "../../validations/validation";
import { useNavigate } from "react-router-dom";
import { FormLayout } from "../../components/FormLayout/FormLayout";
import WebStorage from "../../utils/WebStorage";
import useAppState from "../../hooks/useAppState";

export const VerificationForm = () => {
  const [isResent, setIsResent] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const userEmail = WebStorage.getLocalStore("email");
  const { domainInfo } = useAppState();
  const navigate = useNavigate();

  const navigateToOtherPage = (path: string) => navigate(path);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm } = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: VerificationFormValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await verificationCodeAPI({
          email: userEmail,
          confirmationCode: values.verificationCode,
        });
        if (response.success) {
          setCompleted(true);
          resetForm();
        } else if (!response.success) {
          toastErrMessage(response.message);
        }
      } catch (error) {
        toastErrMessage("An error occurred while processing your request.");
      }
      setSubmitting(false);
    },
  });

  const reSendCode = async () => {
    setIsResent(true);
    resetForm();
    try {
      const response = await reSendVerificationCodeAPI({ email: userEmail });
      if (response.success) {
        resetForm();
      } else if (!response.success) {
        toastErrMessage(response.message);
      }
    } catch (error) {
      toastErrMessage("An error occurred while processing your requests.");
    } finally {
      setIsResent(false);
    }
  };
  if (!userEmail) navigateToOtherPage(ROUTE_NAMES.LOGIN);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <FormLayout>
      <Container>
        <h5 className="email-verification-heading">
          {" "}
          {completed ? "Account created Successfully" : "Email Verification"}
        </h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-0 verification-form-field" controlId="formBasicEmail">
            <Form.Label className="field-label form-field-label">Email Address</Form.Label>
            <Form.Control type="email" placeholder="Email" value={userEmail} readOnly disabled />
          </Form.Group>
          {completed ? (
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
                style={{ backgroundColor: "var(--primary-color)", border: "none", width: "90px", marginTop: "15px" }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Row>
                <p style={{ marginBottom: "30px", fontSize: "14px" }}>
                  Check your email for the verification code to complete your {domainInfo?.companyName} registration.
                  Didn't receive it? Click <span style={{ fontWeight: "bold" }}>"Resend Code"</span>.
                </p>
              </Row>
              <Form.Group className="mb-0 verification-form-field" controlId="formBasicEmail">
                <div className="verification-code-field-label">
                  <Form.Label className="field-label required">Verification Code</Form.Label>
                </div>
                <div className="verification-code-sec">
                  <Form.Control
                    type="text"
                    name="verificationCode"
                    value={values.verificationCode}
                    placeholder="Verification Code"
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    isInvalid={touched.verificationCode && !!errors.verificationCode}
                    style={{ width: "375px", marginRight: "14px" }}
                  />
                  <Form.Label>
                    {isResent ? (
                      <span className="resend-code-loader">
                        <Loader label="" />
                      </span>
                    ) : (
                      <button className="resend-code" type="button" onClick={reSendCode}>
                        {" "}
                        Resend Code
                      </button>
                    )}
                  </Form.Label>
                </div>
              </Form.Group>
              <p className="verify-error-section ">{errors.verificationCode}</p>

              <div className="verification-footer">
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => navigateToOtherPage(ROUTE_NAMES.LOGIN)}
                  className="verify-cancel-btn"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: "var(--primary-color)" }}
                  className="verify-btn"
                >
                  {isSubmitting ? <Loader label="" /> : "Verify Code"}
                </Button>
              </div>
            </>
          )}
        </Form>
      </Container>
    </FormLayout>
  );
};
