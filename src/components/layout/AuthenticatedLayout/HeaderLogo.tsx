import { Link } from "react-router-dom";
import logo from "../../../assets/images/route-header-logo.svg";
import { ROUTE_NAMES } from "../../../utils/constant";
import { LogoLink } from "./AuthenticatedLayout.style";

export const HeaderLogo = () => (
  <LogoLink
    as={Link}
    to={ROUTE_NAMES.BASE_PATH}
    aria-label="Transconomy Route home"
  >
    <img
      src={logo}
      alt="Transconomy Route — Transportation Asset Intelligence"
    />
  </LogoLink>
);
