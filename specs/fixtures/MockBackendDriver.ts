type FakeUserId = number;

export class MockBackendDriver {
  url: string;

  /**
   * Connects to the mock backend ExpressJS server's WebSocket endpoint.
   * Exposes methods that simulate the activity of other users.
   *
   * Environment variables:
   *   - VITE_WEBSOCKET_BACKEND_URL="ws://localhost:5000".
   * */
  constructor() {
    this.url = process.env.VITE_WEBSOCKET_BACKEND_URL ?? "";
  }

  async simulateUserLaunchesApp(): Promise<FakeUserId> {
    const response = await fetch(`http://${this.url}/fake-users/launch-app`);
    const responseData = await response.json();

    if (responseData.error !== undefined) {
      throw Error("Error response from mock backend: " + responseData.error);
    }

    if (responseData.fakeUserId === undefined) {
      throw Error(
        "Expected { fakeUserId: number } from mock backend. Received: " +
          (await response.text())
      );
    }

    console.log(responseData);

    const fakeUserId =
      typeof responseData.fakeUserId === "number"
        ? (responseData.fakeUserId as number)
        : Number.parseInt(responseData.fakeUserId);

    return fakeUserId;
  }

  async simulateUserClosesApp(userId: FakeUserId) {
    const response = await fetch(
      `${this.url}/fake-users/id/${userId}/close-app`
    );
    const responseData = await response.json();

    if (responseData.error !== undefined) {
      throw Error("Error response from mock backend: " + responseData.error);
    }

    console.log(responseData);
  }

  async simulateUserClicksButton(userId: FakeUserId, numberOfTimes = 1) {
    const response = await fetch(
      `${this.url}/fake-users/id/${userId}/click/${numberOfTimes}`
    );
    const responseData = await response.json();

    if (responseData.error !== undefined) {
      throw Error("Error response from mock backend: " + responseData.error);
    }

    console.log(responseData);
  }
}
