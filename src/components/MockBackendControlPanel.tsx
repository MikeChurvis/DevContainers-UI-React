import { ChangeEvent, useId } from "react";
import { useMockBackend } from "../hooks/UseMockBackend";
import { BackendConnectionStatus } from "../types/BackendTypes";

export function MockBackendControlPanel(backendUrl: string) {
  const mockBackend = useMockBackend(backendUrl);

  const connectionStateConnectingId = useId();
  const connectionStateOpenId = useId();
  const connectionStateClosedId = useId();

  return (
    <aside className="absolute bottom-0 right-0 m-3 border border-emerald-600">
      <h2>Mock Backend Control Panel</h2>

      <div>
        State:
        <ul>
          <li>Clicks: {mockBackend.current?.getAppStateObject().clicks}</li>
          <li>
            Users online: {mockBackend.current?.getAppStateObject().usersOnline}
          </li>
        </ul>
      </div>

      <button onClick={() => mockBackend.current?.shutdown()}>
        Shutdown Server
      </button>

      <fieldset>
        <legend>Fake Users</legend>

        <button onClick={() => mockBackend.current?.simulateUserLaunchedApp()}>
          A fake user launches the app.
        </button>

        <ul>
          {[...(mockBackend.current?.state.fakeUsers || [])].map(
            (fakeUserId) => (
              <li key={fakeUserId}>
                <span>Fake User {fakeUserId}</span>
                <button
                  onClick={() =>
                    mockBackend.current?.simulateUserClickedButton(fakeUserId)
                  }
                >
                  clicks the button
                </button>
                <button
                  onClick={() =>
                    mockBackend.current?.simulateUserClosedApp(fakeUserId)
                  }
                >
                  closes the app
                </button>
              </li>
            )
          )}
        </ul>
      </fieldset>
    </aside>
  );
}
