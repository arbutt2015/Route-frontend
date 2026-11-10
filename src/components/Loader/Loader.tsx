import Spinner from "react-bootstrap/Spinner";
import { LoaderContainer } from "./Loader.style";

const Loader = ({ label = "Loading..." }: { label?: string }) => (
  <LoaderContainer role="status" aria-label={label || "Loading"}>
    <Spinner animation="border" size="sm" aria-hidden="true" />
    {label && <span className="loading-text">{label}</span>}
  </LoaderContainer>
);

export default Loader;
