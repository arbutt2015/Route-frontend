import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import routeLogo from "./assets/images/logo.png";
import { useEffect } from "react";
import { getDomainByUrlApi } from "./api/branding";
import useAppState from "./hooks/useAppState";
import { environment } from "./config/environment";

const fallbackDomain = {
  logo: routeLogo,
  companyName: "Transconomy",
  favIcon: routeLogo,
};

const App = () => {
  const { handleDomainInfo, domainInfo } = useAppState();

  useEffect(() => {
    let active = true;
    const loadDomain = async () => {
      try {
        const res = await getDomainByUrlApi(window.location.origin);
        if (!active) return;
        handleDomainInfo(
          res.success && res.data
            ? {
                logo: res.data.logoPath
                  ? new URL(res.data.logoPath, `${environment.apiBaseUrl}/`)
                      .href
                  : routeLogo,
                companyName: res.data.companyName || fallbackDomain.companyName,
                favIcon: res.data.favIcon
                  ? new URL(res.data.favIcon, `${environment.apiBaseUrl}/`).href
                  : routeLogo,
              }
            : fallbackDomain,
        );
      } catch {
        if (active) handleDomainInfo(fallbackDomain);
      }
    };
    void loadDomain();
    return () => {
      active = false;
    };
  }, [handleDomainInfo]);

  useEffect(() => {
    const link =
      document.querySelector<HTMLLinkElement>("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.href = domainInfo?.favIcon ?? routeLogo;
    if (!link.isConnected) document.head.appendChild(link);
  }, [domainInfo?.favIcon]);

  return <AppRoutes />;
};

export default App;
