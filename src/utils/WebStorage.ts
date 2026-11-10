import { AUTH_TOKEN } from "./constant";
import { environment } from "../config/environment";
import type { AuthToken, LoggedInUser } from "../types";

export default class WebStorage {
  static setAuthToken(token: AuthToken) {
    this.setLocalStore(AUTH_TOKEN.Name, token);
    this.setAuthCookie(token.accessToken, token.expiresIn);
  }

  static getAuthToken(): AuthToken | null {
    const token = this.getLocalStore<AuthToken>(AUTH_TOKEN.Name);
    return token &&
      typeof token.accessToken === "string" &&
      token.accessToken.length > 0 &&
      typeof token.refreshToken === "string" &&
      Number.isFinite(token.issuedAt) &&
      Number.isFinite(token.expiresIn) &&
      token.expiresIn > 0
      ? token
      : null;
  }

  static getCurrentUser(): LoggedInUser | null {
    const user = this.getLocalStore<LoggedInUser>("user");
    return user && typeof user.email === "string" ? user : null;
  }

  static removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN.Name);
    this.setAuthCookie("", 0);
  }

  static getLocalStore<T = string>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  static setLocalStore<T>(key: string, value: T) {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  }

  private static setAuthCookie(accessToken: string, maxAge: number) {
    const domain = environment.authCookieDomain
      ? `; Domain=${environment.authCookieDomain}`
      : "";
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${AUTH_TOKEN.Name}=${encodeURIComponent(accessToken)}; Path=/; Max-Age=${Math.floor(maxAge)}; SameSite=Lax${domain}${secure}`;
  }
}
