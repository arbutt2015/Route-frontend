import Spinner from "react-bootstrap/Spinner";
import { LoaderType } from "../../types";
import { LoaderContainer } from "./Loader.style";
import React from "react";
import { IoStopSharp } from "react-icons/io5";

const Loader: React.FC<LoaderType> = ({ onlySpinner, label = "Loading...", color }) => {
  const style2 = { position: "absolute", width: 20, height: 20, borderWidth: "1px" };
  const styleSpinner = onlySpinner ? style2 : {};
  return (
    <LoaderContainer color={color}>
      <Spinner animation="border" size="sm" style={styleSpinner} />
      {!onlySpinner && <span className="loading-text">{label}</span>}
      {onlySpinner && <IoStopSharp />}
    </LoaderContainer>
  );
};

export default Loader;
