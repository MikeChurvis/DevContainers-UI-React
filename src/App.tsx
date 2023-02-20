import { useReducer } from "react";
import { appStateReducer } from "./appState";

function App() {
  const [appState, appStateDispatch] = useReducer(appStateReducer, {
    clicks: 0,
    usersOnline: 0,
  });

  function incrementCount() {
    appStateDispatch({ type: "increment_clicks" });
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
          <img
            src="https://pyatl.dev/wp-content/uploads/2021/09/logo-1-232x300.png"
            alt=""
          />
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

export default App;
