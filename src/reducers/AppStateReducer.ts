type AppState = {
  clicks: number;
  usersOnline: number;
};

type IncrementClicksAction = {
  type: "incrementClicks";
  data?: { byAmount: number };
};

type UpdateAppStateAction = {
  type: "updateAppState";
  data: { state: Partial<AppState> };
};

type AppAction = IncrementClicksAction | UpdateAppStateAction;

export function appStateReducer(state: AppState, action: AppAction): AppState {
  let newState = state;

  switch (action.type) {
    case "incrementClicks":
      newState = {
        ...newState,
        clicks: newState.clicks + (action.data?.byAmount || 1),
      };
      break;
    case "updateAppState":
      newState = updateAppState(newState, action.data.state);
      break;
  }

  return newState;
}

function updateAppState(
  state: AppState,
  fragment: Partial<AppState>
): AppState {
  // Only accept the higher value. The click counter should never go down.
  fragment.clicks = Math.max(state.clicks, fragment.clicks || 0);

  return { ...state, ...fragment };
}
