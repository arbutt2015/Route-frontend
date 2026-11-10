const apiEndpoint = import.meta.env.VITE_API_ENDPOINT?.trim();

if (!apiEndpoint) {
  throw new Error("VITE_API_ENDPOINT must be configured for this environment.");
}

const apiUrl = new URL(apiEndpoint, window.location.origin);
if (
  !["http:", "https:"].includes(apiUrl.protocol) ||
  apiUrl.username ||
  apiUrl.password
) {
  throw new Error(
    "VITE_API_ENDPOINT must be an HTTP(S) URL without credentials.",
  );
}

export const environment = Object.freeze({
  apiBaseUrl: apiUrl.href.replace(/\/+$/, ""),
  authCookieDomain: import.meta.env.VITE_AUTH_COOKIE_DOMAIN?.trim() ?? "",
  googleMapApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY?.trim() ?? "",
  isDevelopment: import.meta.env.DEV,
});
