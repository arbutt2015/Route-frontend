import { request } from "./http.service";
import { API_ENDPOINTS } from "../config/api.config";
import type { DomainBranding } from "../types";

export const getDomainByUrlApi = (domainUrl: string) => {
  const query = new URLSearchParams({ domainUrl });
  return request<DomainBranding>(
    "POST",
    `${API_ENDPOINTS.DOMAIN_BRANDING}?${query}`,
    {},
  );
};
