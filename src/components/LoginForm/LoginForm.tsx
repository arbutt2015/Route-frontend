import { LoginFormContainer } from "./LoginForm.style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { errorType, ROUTE_NAMES, toastErrMessage } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginFormValidationSchema } from "../../validations/validation";
import { loginAPI } from "../../api/auth";
import { getAssignedProjects } from "../../api/projects";
import Loader from "../../components/Loader/Loader";
import WebStorage from "../../utils/WebStorage";
import { useState } from "react";
import useAppState from "../../hooks/useAppState";
import PasswordToggle from "../PasswordToggle/PasswordToggle";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleSetLoggedInUser } = useAppState();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await loginAPI(values);
        if (response.success) {
          WebStorage.setAuthToken({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.ExpiresIn,
            issuedAt: Date.now(),
          });
          handleSetLoggedInUser(response.data.user);
          WebStorage.setLocalStore("showModal", "true");
          const res = await getAssignedProjects();
          if (res.success && res.data) {
            WebStorage.setLocalStore(
              "anyUserAssignedProject",
              res.data.length > 0,
            );
            const user = response.data.user;
            const isNewUser =
              !user.usersAccess &&
              !user.createProjectAccess &&
              !user.assetsAccess &&
              res.data.length === 0;
            WebStorage.setLocalStore("isNewUser", isNewUser);
          }
          navigate(ROUTE_NAMES.BASE_PATH, {
            replace: true,
            state: { showProjects: true },
          });
        } else {
          if (response.data?.type === errorType.NOT_VERIFIED) {
            WebStorage.setLocalStore("email", values.email);
            navigate(ROUTE_NAMES.VERIFICATION);
          } else {
            toastErrMessage(
              response?.message ??
                "An error occurred while processing your request.",
            );
          }
        }
      } catch (error) {
        toastErrMessage("An error occurred while processing your request.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <LoginFormContainer>
      <Form className="login-form" onSubmit={handleSubmit}>
        <p className="login-heading">Sign In</p>
        <Form.Group
          className="mb-0 form-field-section"
          controlId="formBasicEmail"
        >
          <Form.Label className="form-field-label required">
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="abc@xyz.com"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.email && touched.email}
          />

          <Form.Control.Feedback type="invalid">
            <p className="validation-error-message">{errors.email}</p>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="mb-0 form-field-section"
          style={{ position: "relative" }}
          controlId="formBasicPassword"
        >
          <Form.Label className="form-field-label required">
            Password
          </Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter password here"
            name="password"
            style={{ backgroundImage: "none" }}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.password && touched.password}
          />
          {values.password && (
            <PasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((value) => !value)}
            />
          )}

          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="login-footer">
          <Link
            to={ROUTE_NAMES.REQUEST_PASSWORD_RESET}
            className="forgot-password-link"
          >
            Forgot password?
          </Link>
          <Button
            variant="primary"
            type="submit"
            className="login-btn"
            disabled={isSubmitting}
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            {isSubmitting ? <Loader label="" /> : "Sign In"}
          </Button>
        </div>
      </Form>
    </LoginFormContainer>
  );
};

export default LoginForm;
