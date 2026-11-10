import { ErrorFallbackContainer } from "./ErrorFallBack.style";
import oops from "../../assets/images/oops.png";

const env = import.meta.env.NODE_ENV;

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <ErrorFallbackContainer role="alert">
      <img src={oops} height={170} loading="lazy" style={{ mixBlendMode: "multiply" }} />
      <p className="error-heading">Oops! Something went wrong.</p>
      <p>We encountered an issue while processing your request. Our team is looking into it.</p>

      {env !== "production" && (
        <>
          <p style={{ color: "red" }}>Error details: {error?.message ?? `${error}`}</p>
          <pre style={{ color: "red" }}>{error?.stack ?? ""}</pre>
        </>
      )}

      <button onClick={resetErrorBoundary} className="hidden-btn">
        Try again
      </button>
    </ErrorFallbackContainer>
  );
};

export default ErrorFallback;
