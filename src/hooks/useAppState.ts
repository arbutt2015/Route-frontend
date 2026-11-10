import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { setDomainInfo, setUser } from "../redux/slices/appState";
import type { DomainInfo, LoggedInUser } from "../types";
import WebStorage from "../utils/WebStorage";

const useAppState = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { domainInfo, user } = useSelector(
    (state: RootState) => state.appState,
  );

  const handleDomainInfo = useCallback(
    (value: DomainInfo) => {
      dispatch(setDomainInfo(value));
    },
    [dispatch],
  );

  const handleSetLoggedInUser = useCallback(
    (value: LoggedInUser) => {
      WebStorage.setLocalStore("user", value);
      dispatch(setUser(value));
    },
    [dispatch],
  );

  return { domainInfo, user, handleDomainInfo, handleSetLoggedInUser };
};

export default useAppState;
