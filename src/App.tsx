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
    <main className="dark:bg-slate-700 flex justify-center items-center min-h-screen">
      <section className=" flex flex-col gap-2 items-center">
        <h1 className="text-5xl dark:text-slate-100">Hello, PyATL!</h1>
        <p className="dark:text-slate-300 text-slate-700">(click the logo!)</p>
        <button
          onClick={incrementCount}
          className="relative"
          aria-label={`The Python Atlanta logo, serving as a button. It has been clicked ${appState.clicks} times. Click it more!`}
        >
          <img
            className="max-h-[70vh] my-7 drop-shadow-[0_0_8px_rgba(255,128,0,0.5)]"
            src="https://pyatl.dev/wp-content/uploads/2021/09/logo-1-232x300.png"
            role="presentation"
            alt="The Python Atlanta logo."
          />
          <span
            id="click-counter"
            aria-label="The number of times the logo has been clicked."
            className="text-8xl font-bold dark:text-slate-100 text-center absolute top-[50%] translate-y-[-30%] left-0 right-0 m-auto"
          >
            {appState.clicks}
          </span>
        </button>
      </section>
    </main>
  );
}

export default App;
