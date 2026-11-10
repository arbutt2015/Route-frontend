import { LoginFormContainer } from "./LoginForn.style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { errorType, ROUTE_NAMES, toastErrMessage } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginFormValidationSchema } from "../../validations/validation";
import { loginAPI } from "../../api/auth";
import Loader from "../../components/Loader/Loader";
import WebStorage from "../../utils/WebStorage";
import { useEffect, useState } from "react";
import { LoginFormType } from "../../types";
import { getUserAssignedProjectsApi } from "../../api/dashboard";
import useAppState from "../../hooks/useAppState";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const LoginForm: React.FC<LoginFormType> = ({ handleSetEmailTouched, isEmailTouched }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { handleSetIsNewUser, handleAnyUserAssignedProject } = useAppState();

  const { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting, touched, setFieldTouched } = useFormik({
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
          WebStorage.setLocalStore("user", response.data.user);
          WebStorage.setLocalStore("showModal", "true");
          const res = await getUserAssignedProjectsApi();

          if (res.success && res?.data?.length > 0) {
            handleAnyUserAssignedProject(true);
          }
          if (
            !response.data.user.usersAccess &&
            !response.data.user.createProjectAccess &&
            !response.data.user.assetsAccess &&
            res?.success &&
            res?.data
          ) {
            if (res?.data?.length === 0) {
              handleSetIsNewUser(true);
              navigate(ROUTE_NAMES.BASE_PATH, {
                state: { showProjects: true },
              });
              return;
            }
          }
          navigate(ROUTE_NAMES.BASE_PATH, {
            state: { showProjects: true },
          });
        } else {
          if (response.data?.type === errorType.NOT_VERIFIED) {
            navigate(ROUTE_NAMES.VERIFICATION);
          } else {
            toastErrMessage(response?.message ?? "An error occurred while processing your request.");
          }
        }
      } catch (error) {
        toastErrMessage("An error occurred while processing your request.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    setFieldTouched("email", false);
    setFieldTouched("password", false);
  }, [isEmailTouched, setFieldTouched]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetEmailTouched(false);

    handleChange(e);
  };
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleSetEmailTouched(false);

    handleBlur(e);
  };
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSetEmailTouched(false);

    handleSubmit();
  };

  return (
    <LoginFormContainer>
      <Form className="login-form" onSubmit={handleOnSubmit}>
        <p className="login-heading">Sign In</p>
        <Form.Group className="mb-0 form-field-section" controlId="formBasicEmail">
          <Form.Label className="form-field-label required">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="abc@xyz.com"
            name="email"
            value={values.email}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            isInvalid={!!errors.email && touched.email}
          />

          <Form.Control.Feedback type="invalid">
            <p className="validation-error-message">{errors.email}</p>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-0 form-field-section" style={{ position: "relative" }} controlId="formBasicPassword">
          <Form.Label className="form-field-label required">Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter password here"
            name="password"
            style={{ backgroundImage: "none" }}
            value={values.password}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            isInvalid={!!errors.password && touched.password}
          />
          {values.password && <button className="hidden-btn" style={{
            position: "absolute",
            top: "57%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 2,
          }} type="button" onClick={() => setShowPassword(!showPassword)} >
            {!showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
          </button>}

          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <div className="login-footer">
          <Link to={ROUTE_NAMES.REQUEST_PASSWORD_RESET} className="forgot-password-link">
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
