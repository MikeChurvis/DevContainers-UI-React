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
    <main className="flex min-h-screen items-center justify-center dark:bg-slate-700">
      <section className=" flex flex-col items-center gap-2">
        <h1 className="text-5xl dark:text-slate-100">Hello, PyATL!</h1>
        <p className="text-slate-700 dark:text-slate-300">
          (click the logo, raise the count)
        </p>
        <button
          onClick={incrementCount}
          className="group relative"
          tabIndex={0}
          aria-label={`The Python Atlanta logo. It has been clicked ${appState.clicks} times. Click it more!`}
        >
          <img
            className="my-7 max-h-[70vh] shadow-red-400 drop-shadow-[0_0_4px_var(--tw-shadow-color)] transition-all hover:-translate-y-1 hover:drop-shadow-[0_6px_5px_var(--tw-shadow-color)] active:translate-y-0 active:shadow-orange-400 active:drop-shadow-[0_0_4px_var(--tw-shadow-color)] active:duration-[50ms]"
            src="https://pyatl.dev/wp-content/uploads/2021/09/logo-1-232x300.png"
            role="presentation"
            alt="The Python Atlanta logo."
          />
          <span
            id="click-counter"
            role="presentation"
            className="pointer-events-none absolute top-[50%] left-0 right-0 m-auto translate-y-[-30%] text-center text-8xl font-bold text-white shadow-black [text-shadow:_0_0_8px_var(--tw-shadow-color)]"
          >
            {appState.clicks}
          </span>
        </button>
      </section>
    </main>
  );
}

export default App;
