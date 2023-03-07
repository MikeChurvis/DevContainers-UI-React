import { ChangeEvent, useId } from "react";
import { useMockBackend } from "../hooks/UseMockBackend";
import { BackendConnectionStatus } from "../types/BackendTypes";

export function MockBackendControlPanel(backendUrl: string) {
  const mockBackend = useMockBackend(backendUrl);

  const connectionStateConnectingId = useId();
  const connectionStateOpenId = useId();
  const connectionStateClosedId = useId();

  function onConnectionStatusChange(event: ChangeEvent<HTMLInputElement>) {
    if (!(event.target.value in BackendConnectionStatus)) {
      console.error(
        "Mock backend gave an invalid connection status.",
        event.target.value
      );
      return;
    }
    mockBackend.setConnectionStatus(
      event.target.value as BackendConnectionStatus
    );
  }

  return (
    <aside className="absolute bottom-0 right-0 m-3 border border-emerald-600">
      <h2>Mock Backend Control Panel</h2>

      <div>
        State:
        <ul>
          <li>Clicks: {mockBackend.clicks}</li>
          <li>Users online: {mockBackend.getUsersOnline()}</li>
        </ul>
      </div>

      <fieldset>
        <legend>Simulate Connection Status</legend>
        <ul>
          <li>
            <input
              type="radio"
              name="connectionState"
              value="connecting"
              checked={mockBackend.connectionStatus === "connecting"}
              id={connectionStateConnectingId}
              onChange={onConnectionStatusChange}
            />
            <label htmlFor={connectionStateConnectingId}>Connecting</label>
          </li>
          <li>
            <input
              type="radio"
              name="connectionState"
              value="open"
              checked={mockBackend.connectionStatus === "open"}
              id={connectionStateOpenId}
              onChange={onConnectionStatusChange}
            />
            <label htmlFor={connectionStateOpenId}>Open</label>
          </li>
          <li>
            <input
              type="radio"
              name="connectionState"
              value="closed"
              checked={mockBackend.connectionStatus === "closed"}
              id={connectionStateClosedId}
              onChange={onConnectionStatusChange}
            />
            <label htmlFor={connectionStateClosedId}>Closed</label>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <legend>Fake Users</legend>

        <button onClick={() => mockBackend.simulateUserLaunchedApp()}>
          A fake user launches the app.
        </button>

        <ul>
          {[...mockBackend.fakeUsers].map((fakeUserId) => (
            <li key={fakeUserId}>
              <span>Fake User {fakeUserId}</span>
              <button
                onClick={() =>
                  mockBackend.simulateUserClickedButton(fakeUserId)
                }
              >
                clicks the button
              </button>
              <button
                onClick={() => mockBackend.simulateUserClosedApp(fakeUserId)}
              >
                closes the app
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
    </aside>
  );
}
