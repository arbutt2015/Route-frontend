import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DomainInfo, LoggedInUser } from "../../types";
import WebStorage from "../../utils/WebStorage";

interface AppState {
  domainInfo: DomainInfo | null;
  user: LoggedInUser | null;
}

const initialState: AppState = {
  domainInfo: null,
  user: WebStorage.getCurrentUser(),
};

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setDomainInfo: (state, action: PayloadAction<DomainInfo>) => {
      state.domainInfo = action.payload;
    },
    setUser: (state, action: PayloadAction<LoggedInUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setDomainInfo, setUser } = appSlice.actions;
export default appSlice.reducer;
