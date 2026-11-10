export const API_ENDPOINTS = {
  SIGN_IN: "/auth/signin",
  SIGN_UP: "/auth/signup",
  CHECK_DOMAIN: "/auth/check-domain",
  CONFIRM_SIGN_UP: "/auth/confirm-sign-up",
  RESEND_CODE: "/auth/resend-code",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/confirm-forgot-password",
  REFRESH_TOKEN: "/auth/refresh-token",
  DOMAIN_BRANDING: "/client-domains/get-by-domain-url",
  PROFILE: "/users/me",
  CHANGE_PASSWORD: "/auth/change-password",
} as const;
