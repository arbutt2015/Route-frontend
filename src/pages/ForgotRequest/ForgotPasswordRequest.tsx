import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FormLayout } from "../../components/FormLayout/FormLayout";
import { Container } from "./ForgotPasswordRequest.style";
import { forgotPasswordEmailValidation } from "../../validations/validation";
import Loader from "../../components/Loader/Loader";
import { ROUTE_NAMES, toastErrMessage } from "../../utils/constant";
import { requestPasswordReset } from "../../api/auth";

export const ForgotPasswordRequestForm = () => {
  const navigate = useNavigate();

  const navigateToOtherPage = (path: string) => navigate(path);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordEmailValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await requestPasswordReset({ email: values.email });
        if (response.success) {
          navigate(ROUTE_NAMES.FORGOT_PASSWORD, {
            state: { email: values.email },
          });
        } else {
          toastErrMessage(response?.message);
        }
      } catch (error) {
        toastErrMessage("An error occurred while processing your request.");
      }
      setSubmitting(false);
    },
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };
  return (
    <FormLayout>
      <Container>
        <Form onSubmit={handleSubmit} className="forgot-password-form">
          <p className="forgot-password-heading">Forgot Password</p>
          <p className="forgot-password-msg">
            Please enter your email address, and we will send a verification
            code to reset your password.
          </p>
          <Form.Group
            className="forgot-password-form-field"
            controlId="formBasicEmail"
          >
            <Form.Label className="required forgot-password-field-label">
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleOnChange}
              onBlur={handleBlur}
              placeholder="abc@gmail.com"
              isInvalid={touched.email && !!errors.email}
              className="forgot-password-input-field"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
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
      </Container>
    </FormLayout>
  );
};
