import * as Yup from "yup";

const NO_SPACES_MESSAGE = "Field cannot include spaces";

const passwordSchema = Yup.string()
  .trim(NO_SPACES_MESSAGE)
  .strict(true)
  .required("Password is required.")
  .min(8, "Password must be at least 8 characters.")
  .matches(/(?=.*[A-Z])/, "Must contain one uppercase letter.")
  .matches(/(?=.*[a-z])/, "Must contain one lowercase letter.")
  .matches(/(?=.*[0-9])/, "Must contain one number.")
  .matches(
    /(?=.*[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?`~])/,
    "Must contain one special character.",
  );

const confirmPasswordSchema = Yup.string()
  .trim(NO_SPACES_MESSAGE)
  .strict(true)
  .required("Confirm password is required.")
  .oneOf([Yup.ref("password")], "Passwords must match.");

export const registrationValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
  lastName: Yup.string()
    .required("Last name is required.")
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
  companyName: Yup.string()
    .required("Company name is required.")
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
  middleInitial: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
  title: Yup.string().trim(NO_SPACES_MESSAGE).strict(true),
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions.")
    .required("You must accept the terms and conditions."),
});

export const emailValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required."),
});

export const loginFormValidationSchema = emailValidationSchema.shape({
  password: Yup.string().required("Password is required."),
});

export const VerificationFormValidationSchema = Yup.object({
  verificationCode: Yup.string()
    .required("Verification code is required.")
    .trim(NO_SPACES_MESSAGE)
    .strict(true),
});

export const forgotPasswordFormValidation = Yup.object({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  verificationCode: Yup.string()
    .length(6, "Verification code must be exactly 6 characters.")
    .required("Verification code is required."),
});

export const profileValidationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required.").max(100),
  middleInitial: Yup.string().trim().max(50),
  lastName: Yup.string().trim().required("Last name is required.").max(100),
  companyName: Yup.string()
    .trim()
    .required("Company name is required.")
    .max(200),
  title: Yup.string().trim().max(100),
  phoneNumber: Yup.string().trim().max(50),
});

export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required.")
    .max(256),
  newPassword: passwordSchema
    .max(256)
    .matches(/^\S+$/, "Password cannot contain spaces.")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password must differ from the current password.",
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("newPassword")], "Passwords must match."),
});

export const forgotPasswordEmailValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
});
