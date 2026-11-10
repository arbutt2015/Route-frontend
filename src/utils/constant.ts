import type { ReactNode } from "react";
import { toast, type ToastPosition } from "react-toastify";

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

type ToastMessage = string | ReactNode;

export const toastErrMessage = (
  message: ToastMessage,
  position: ToastPosition | undefined = "bottom-center",
  hideProgressBar: boolean = true,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  autoClose: number = 2500,
): void => {
  toast.error(message, {
    position,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    autoClose,
    toastId: "unique-error-toast",
  });
};

export const toastSuccessMessage = (
  message: ToastMessage,
  position: ToastPosition | undefined = "bottom-center",
  hideProgressBar: boolean = true,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  autoClose: number = 2500,
): void => {
  toast.success(message, {
    position,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    autoClose,
    toastId: "unique-success-toast",
  });
};

export const toastInfoMessage = (
  message: ToastMessage,
  position: ToastPosition | undefined = "bottom-center",
  hideProgressBar: boolean = true,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
  autoClose: number = 1000,
): void => {
  toast.info(message, {
    position,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    autoClose,
    toastId: "unique-info-toast",
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
