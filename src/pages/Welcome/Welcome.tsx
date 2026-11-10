import Button from "react-bootstrap/Button";
import { logoutUser } from "../../utils/helper";
import useAppState from "../../hooks/useAppState";

const Welcome = () => {
  const { user } = useAppState();

  return (
    <div className="welcome-page" style={{ padding: "40px" }}>
      <h1>Welcome to Route</h1>
      <p>Your application is up and running.</p>
      {user && (
        <p>
          Signed in as {user.firstName} {user.lastName} ({user.email})
        </p>
      )}
      <Button variant="primary" onClick={logoutUser} style={{ backgroundColor: "var(--primary-color)", border: "none" }}>
        Sign Out
      </Button>
    </div>
  );
};

export default Welcome;
