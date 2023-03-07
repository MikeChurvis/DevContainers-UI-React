import { Server } from "mock-socket";

type FakeUserId = number;

export class MockBackend {
  webSocketServer: Server;
  state: {
    clicks: number;
    fakeUsers: Set<FakeUserId>;
    nextFakeUserId: number;
  };

  constructor(url: string) {
    this.webSocketServer = new Server(url);

    this.webSocketServer.on("connection", (client) => {
      client.onopen = this.handleOpen;
      client.onerror = this.handleError;
      client.onclose = this.handleClose;
      client.onmessage = this.handleMessage;
    });

    this.state = {
      clicks: 0,
      fakeUsers: new Set(),
      nextFakeUserId: 0,
    };
  }

  handleMessage(event: MessageEvent) {
    const message = event.data.toString();

    if (message === "click") {
      this.handleClick();
      return;
    }

    console.warn(`[mock-backend] Unrecognized message received.`, message);
  }

  handleError(event: Event) {
    console.error("[mock-backend] An error occurred.", event);
  }

  handleClose(event: CloseEvent) {
    console.warn(
      `[mock-backend] The server closed the websocket connection.`,
      event
    );
  }

  handleOpen() {
    console.log(`[mock-backend] Connection with client is now open.`);
    this.publishAppState();
  }

  handleClick() {
    this.state.clicks++;
    this.publishAppState();
  }

  generateNewUserId(): FakeUserId {
    return this.state.nextFakeUserId++;
  }

  publishAppState() {
    this.webSocketServer.clients().forEach((client) => {
      client.send(this.serializeAppState());
    });
  }

  getAppStateObject() {
    return {
      clicks: this.state.clicks,
      usersOnline:
        this.webSocketServer.clients().length + this.state.fakeUsers.size,
    };
  }

  serializeAppState(): string {
    return JSON.stringify({
      type: "updateAppState",
      data: { state: this.getAppStateObject() },
    });
  }

  simulateUserLaunchedApp(): FakeUserId {
    const userId = this.generateNewUserId();

    this.state.fakeUsers.add(userId);

    console.log(`[simulation] Fake User ${userId} launched the app.`);

    this.publishAppState();

    return userId;
  }

  simulateUserClickedButton(userId: FakeUserId) {
    if (!this.state.fakeUsers.has(userId)) {
      console.warn(
        `[simulation] Fake User ${userId} cannot click the button because they do not exist.`
      );
      return;
    }

    console.log(`[simulation] Fake User ${userId} clicked the button.`);

    this.handleClick();
  }

  simulateUserClosedApp(userId: FakeUserId) {
    const userExisted = this.state.fakeUsers.delete(userId);

    if (!userExisted) {
      console.warn(
        `[simulation] Fake User ${userId} cannot close the app because they do not exist.`
      );
      return;
    }

    console.log(`[simulation] Fake User ${userId} closed the app.`);

    this.publishAppState();
  }

  shutdown() {
    this.webSocketServer.close();
  }
}
