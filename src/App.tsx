import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import routeLogo from "./assets/images/logo.png";
import { useEffect } from "react";
import useAppState from "./hooks/useAppState";

const fallbackDomain = {
  logo: routeLogo,
  companyName: "Transconomy",
  favIcon: routeLogo,
};

const App = () => {
  const { handleDomainInfo, domainInfo } = useAppState();

  useEffect(() => {
    handleDomainInfo(fallbackDomain);
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
