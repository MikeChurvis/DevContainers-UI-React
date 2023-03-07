export type AppState = {
  clicks: number;
  usersOnline: number;
};

export type IncrementClicksAction = {
  type: "incrementClicks";
  data?: { byAmount: number };
};

export type UpdateAppStateAction = {
  type: "updateAppState";
  data: { state: Partial<AppState> };
};

export type AppAction = IncrementClicksAction | UpdateAppStateAction;
