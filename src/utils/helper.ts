import { refreshTokenAPI } from "../api/auth";
import type { AuthToken } from "../types";
import WebStorage from "./WebStorage";
import { ROUTE_NAMES } from "./constant";

export const logoutUser = () => {
  WebStorage.removeAuthToken();
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  window.location.replace(ROUTE_NAMES.LOGIN);
};

const refreshSession = async (token: AuthToken): Promise<AuthToken | null> => {
  const result = await refreshTokenAPI({ refreshToken: token.refreshToken });
  if (!result.success || !result.data.access_token) return null;
  const renewedToken = {
    ...token,
    accessToken: result.data.access_token,
    expiresIn: result.data.ExpiresIn,
    issuedAt: Date.now(),
  };
  WebStorage.setAuthToken(renewedToken);
  return renewedToken;
};

let refreshRequest: Promise<AuthToken | null> | null = null;

export const JWTConfig = async (headers: Record<string, string> = {}) => {
  let token = WebStorage.getAuthToken();
  if (token && token.issuedAt + token.expiresIn * 1000 <= Date.now()) {
    refreshRequest ??= refreshSession(token).finally(() => {
      refreshRequest = null;
    });
    token = await refreshRequest;
  }
  if (!token) {
    logoutUser();
    throw new Error("Authentication required");
  }
  return {
    headers: { ...headers, Authorization: `Bearer ${token.accessToken}` },
  };
};
