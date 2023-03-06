import { useReducer } from "react";
import { appStateReducer } from "./reducers/AppStateReducer";
import PyATLLogo from "./assets/pyatl-logo.png";

export default function App() {
  const [appState, performAction] = useReducer(appStateReducer, {
    clicks: 0,
    usersOnline: 0,
  });

  function incrementCount() {
    performAction({ type: "increment_clicks" });
  }

  return (
    <>
      <header>
        <hgroup>
          <h1>Hello, PyATL!</h1>
          <p>(click the button, raise the count)</p>
        </hgroup>
      </header>
      <main>
        <button
          onClick={incrementCount}
          tabIndex={0}
          aria-label="Click this button to raise the count below."
        >
          <img src={PyATLLogo} alt="" />
        </button>

        <div data-testid="clicks">
          <span>Clicks:</span>
          <span role="status">{appState.clicks}</span>
        </div>

        <div data-testid="users-online">
          <span>Clickers online:</span>
          <span role="status">{appState.usersOnline}</span>
        </div>
      </main>
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
