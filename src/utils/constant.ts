import { toast } from "react-toastify";

export const ROUTE_NAMES = {
  BASE_PATH: "/",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  VERIFICATION: "/verification",
  FORGOT_PASSWORD: "/forgot-password",
  REQUEST_PASSWORD_RESET: "/request-password-reset",
} as const;

export const AUTH_TOKEN = { Name: "auth_cookie" } as const;

export const errorType = {
  NOT_VERIFIED: "UserNotConfirmedException",
} as const;

export const toastErrMessage = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    hideProgressBar: true,
    autoClose: 2500,
    toastId: "request-error",
  });
};

export const validationRules = [
  { regex: /.{8,}/, message: "At least 8 characters" },
  { regex: /(?=.*[A-Z])/, message: "One uppercase letter" },
  { regex: /(?=.*[a-z])/, message: "One lowercase letter" },
  { regex: /(?=.*[0-9])/, message: "One number" },
  {
    regex: /(?=.*[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?`~])/,
    message: "One special character",
  },
];
