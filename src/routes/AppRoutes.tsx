import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import { ROUTE_NAMES } from "../utils/constant";
import { VerificationForm } from "../pages/VerificationForm/VerificationForm";
import Registration from "../pages/registration/RegistrationForm";
import { ForgotPasswordForm } from "../pages/Forgot/ForgotPassword";
import { ForgotPasswordRequestForm } from "../pages/ForgotRequest/ForgotPasswordRequest";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthenticatedLayout } from "../components/layout/AuthenticatedLayout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_NAMES.LOGIN} element={<Login />} />
        <Route path={ROUTE_NAMES.VERIFICATION} element={<VerificationForm />} />
        <Route path={ROUTE_NAMES.REGISTRATION} element={<Registration />} />
        <Route
          path={ROUTE_NAMES.FORGOT_PASSWORD}
          element={<ForgotPasswordForm />}
        />
        <Route
          path={ROUTE_NAMES.REQUEST_PASSWORD_RESET}
          element={<ForgotPasswordRequestForm />}
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path={ROUTE_NAMES.BASE_PATH} element={<Dashboard />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to={ROUTE_NAMES.BASE_PATH} replace />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
