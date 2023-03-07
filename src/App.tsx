import { useReducer } from "react";
import { appStateReducer } from "./state/AppState";
import PyATLLogo from "./assets/pyatl-logo.png";
import { MockBackendControlPanel } from "./components/MockBackendControlPanel";
import { useBackend } from "./hooks/UseBackend";
import type { AppAction } from "./types/AppTypes";

export default function App() {
  // DEV is true in `yarn dev` but false in `yarn preview`.
  const isDevMode = import.meta.env.DEV;
  const backendUrl = `ws://${import.meta.env.VITE_WEBSOCKET_BACKEND_URL}`;

  const [appState, performAction] = useReducer(appStateReducer, {
    clicks: 0,
    usersOnline: 0,
  });

  const backend = useBackend({
    url: backendUrl,
    state: appState,
    dispatch: performAction,
  });

  function incrementClicks() {
    const action: AppAction = { type: "incrementClicks" };

    performAction(action);
    backend.notifyOfAction(action);
  }

  return (
    <>
      {
        /* MAKE SURE `import.meta.env.DEV === false` WHEN TESTING AND DEPLOYING. 
          This component mocks the backend for its lifetime. 
          If other mocks are established while this component is mounted, 
          such as the mocks used in the app specification test fixtures, 
          the app's behavior may be undefined.
        */
        isDevMode ? MockBackendControlPanel(backendUrl) : null
      }

      <header>
        <hgroup>
          <h1>Hello, PyATL!</h1>
          <p>(click the button, raise the count)</p>
        </hgroup>
      </header>

      <button
        onClick={incrementClicks}
        tabIndex={0}
        aria-label="Click this button to raise the count below."
        data-testid="button"
      >
        <img src={PyATLLogo} alt="" />
      </button>

      <div data-testid="clicks" role="status">
        Clicks: {appState.clicks}
      </div>

      <div data-testid="users-online" role="status">
        Clickers online: {appState.usersOnline}
      </div>

      <footer>
        <a
          href="https://www.meetup.com/python-atlanta/events/qvsqxsyfcgbjb"
          target="_blank"
          rel="noreferrer"
          data-testid="jam-link"
        >
          Dev Containers Workshop
        </a>
        <a
          href="https://mikechurvis.com"
          target="_blank"
          rel="noreferrer"
          data-testid="website-link"
        >
          My Website
        </a>
      </footer>
    </>
  );
}
