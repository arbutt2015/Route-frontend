import { useLocation, Navigate, Outlet } from "react-router-dom";
import WebStorage from "../../utils/WebStorage";
import { ROUTE_NAMES } from "../../utils/constant";

const ProtectedRoute = () => {
  const token = WebStorage.getAuthToken();
  const location = useLocation();

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTE_NAMES.LOGIN} state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
