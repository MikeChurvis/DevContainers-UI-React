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
            role="presentation"
          />
        </button>

        <span aria-label="Times the button has been clicked:">
          {appState.clicks}
        </span>

        <div>
          <span>Clickers online:</span>
          <span>{appState.usersOnline}</span>
        </div>
      </main>
      <footer>
        <a href="">Dev Containers Workshop</a>
        <a href="">See My Website</a>
      </footer>
    </>
  );
}

export default App;
