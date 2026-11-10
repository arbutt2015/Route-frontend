import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import routeLogo from "./assets/images/logo.png";
import DisableZoom from "./components/DisableZoom/DisableZoom";
import { useEffect } from "react";
import { getDomainByUrlApi } from "./api/dashboard";
import useAppState from "./hooks/useAppState";
import favIcon from "./assets/images/logo.png";
import { BASE_URL } from "./utils/constant";

const App = () => {
  const { handleDomainInfo, domainInfo } = useAppState();

  const getDomainInfo = async () => {
    const domain = window.location.origin;

    try {
      const res = await getDomainByUrlApi(domain);
      if (res?.success) {
        handleDomainInfo({
          logo: res?.data?.logoPath ? `${BASE_URL}/${res?.data?.logoPath}` : `${routeLogo}`,
          companyName: res.data?.companyName,
          favIcon: res?.data?.favIcon ? `${BASE_URL}/${res?.data?.favIcon}` : `${favIcon}`,
        });
      } else {
        handleDomainInfo({
          logo: `${routeLogo}`,
          companyName: "Transconomy",
          favIcon: `${favIcon}`,
        });
      }
    } catch (error) {
      handleDomainInfo({
        logo: `${routeLogo}`,
        companyName: "Transconomy",
        favIcon: `${favIcon}`,
      });
    }
  };
  useEffect(() => {
    const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement("link");

    link.rel = "icon";
    link.href = domainInfo?.favIcon ?? favIcon;
    document.head.appendChild(link);
  }, [domainInfo?.favIcon]);

  useEffect(() => {
    getDomainInfo();
  }, []);

  return (
    <>
      <div className="for-small-device">
        <img src={domainInfo?.logo} alt="Transconomy Logo" className="logo-image-for-small-device" />
        <p className="message-for-small-device">
          To access {domainInfo?.companyName} Route, please access the {domainInfo?.companyName} Route website using
          a desktop browser on your computer.
        </p>
      </div>
      <div className="for-large-device">
        <DisableZoom />
        <AppRoutes />
      </div>
    </>
  );
};

export default App;
