/* eslint-disable @typescript-eslint/no-explicit-any */
import { AUTH_TOKEN } from "./constant";

const localStore = localStorage;
export default class WebStorage {
  static setAuthToken(value: any) {
    this.setLocalStore(AUTH_TOKEN.Name, value);
    // Also store in cookie
    this.setCookie(AUTH_TOKEN.Name, value);
  }

  static getAuthToken() {
    return this.getLocalStore(AUTH_TOKEN.Name);
  }

  static getCuurentUser() {
    return this.getLocalStore("user");
  }

  static removeAuthToken() {
    this.removeLocalStore(AUTH_TOKEN.Name);
    // Also remove from cookie
    this.removeCookie(AUTH_TOKEN.Name);
  }
  static getLocalStore(keyName: string) {
    const keyValue = localStore.getItem(keyName);
    return this.processGetData(keyValue);
  }

  static setLocalStore(keyName: string, keyValue: string) {
    localStore.setItem(keyName, this.processSetData(keyValue));
  }

  static removeLocalStore(keyName: string) {
    localStore.removeItem(keyName);
  }

  static processGetData(str: string | null) {
    try {
      return JSON.parse(str ?? "");
    } catch (e) {
      return str;
    }
  }

  static processSetData(value: any) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    return value.toString();
  }

  // Cookie methods
  static setCookie(name: string, value: any, days: number = 7) {
    console.log(days);
    // const cookieValue = typeof value === "object" ? JSON.stringify(value) : value;
    // const date = new Date();
    // date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    // const expires = `expires=${date.toUTCString()}`;
    // const path = "path=/";
    // document.cookie = `${name}=${encodeURIComponent(cookieValue)};${expires};${path};Secure;SameSite=Strict`;
    // document.cookie = `${name}=${value?.accessToken};SameSite=Strict`;
    document.cookie = `${name}=${value?.accessToken}; domain=.transconomy.com; path=/; secure; SameSite=None`;
  }

  static getCookie(name: string) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        try {
          const value = decodeURIComponent(cookie.substring(nameEQ.length));
          return JSON.parse(value);
        } catch (e) {
          return decodeURIComponent(cookie.substring(nameEQ.length));
        }
      }
    }
    return null;
  }

  static removeCookie(name: string) {
    this.setCookie(name, "", -1);
  }
}
