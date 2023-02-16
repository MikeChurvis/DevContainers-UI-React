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
        <p className="dark:text-slate-300 text-slate-700">
          (click the logo, raise the count)
        </p>
        <button
          onClick={incrementCount}
          className="relative group"
          tabIndex={0}
          aria-label={`The Python Atlanta logo. It has been clicked ${appState.clicks} times. Click it more!`}
        >
          <img
            className="max-h-[70vh] my-7 transition-all active:duration-[50ms] hover:drop-shadow-[0_6px_5px_var(--tw-shadow-color)] hover:-translate-y-1 active:translate-y-0 active:drop-shadow-[0_0_4px_var(--tw-shadow-color)] active:shadow-orange-400 drop-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-red-400"
            src="https://pyatl.dev/wp-content/uploads/2021/09/logo-1-232x300.png"
            role="presentation"
            alt="The Python Atlanta logo."
          />
          <span
            id="click-counter"
            role="presentation"
            className="text-8xl font-bold pointer-events-none text-white [text-shadow:_0_0_8px_var(--tw-shadow-color)] shadow-black text-center absolute top-[50%] translate-y-[-30%] left-0 right-0 m-auto"
          >
            {appState.clicks}
          </span>
        </button>
      </section>
    </main>
  );
}

export default App;
