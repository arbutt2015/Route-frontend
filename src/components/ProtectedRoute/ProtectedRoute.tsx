import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import WebStorage from "../../utils/WebStorage";
import { JWTConfig } from "../../utils/helper";
import { ROUTE_NAMES } from "../../utils/constant";
import Loader from "../Loader/Loader";

const ProtectedRoute = () => {
  const token = WebStorage.getAuthToken();
  const location = useLocation();
  const expired = Boolean(
    token && token.issuedAt + token.expiresIn * 1000 <= Date.now(),
  );
  const [sessionReady, setSessionReady] = useState(!expired);

  useEffect(() => {
    if (!expired) return;
    let active = true;
    setSessionReady(false);
    void JWTConfig()
      .then(() => {
        if (active) setSessionReady(true);
      })
      .catch(() => {
        if (active) setSessionReady(false);
      });
    return () => {
      active = false;
    };
  }, [expired]);

  if (!token)
    return (
      <Navigate to={ROUTE_NAMES.LOGIN} state={{ from: location }} replace />
    );
  if (!sessionReady) return <Loader />;
  return <Outlet />;
};

export default ProtectedRoute;
