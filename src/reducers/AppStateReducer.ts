type AppState = {
  clicks: number;
  usersOnline: number;
};

type IncrementClicksAction = {
  type: "increment_clicks";
};

type SetUsersOnlineAction = {
  type: "set_users_online";
  usersOnline: number;
};

type SetClicksAction = {
  type: "set_clicks";
  clicks: number;
};

type UpdateStateAction = {
  type: "update_state";
  data: Partial<AppState>;
};

export type AppStateAction =
  | IncrementClicksAction
  | SetUsersOnlineAction
  | SetClicksAction
  | UpdateStateAction;

function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case "increment_clicks":
      return { ...state, clicks: state.clicks + 1 };
    case "set_users_online":
      return { ...state, usersOnline: action.usersOnline };
    case "set_clicks":
      return { ...state, clicks: Math.max(action.clicks, state.clicks) };
    case "update_state":
      action.data.clicks = Math.max(action.data.clicks || 0, state.clicks);
      return { ...state, ...action.data };
  }
}

export { appStateReducer };
export type { AppState };
