import { Server } from "mock-socket";
import {
  MessageFromFrontend,
  UserClickedMessage,
  ClickCountChangedMessage,
  UsersOnlineChangedMessage,
  MessageFromBackend,
} from "../../src/contracts/WebsocketMessageContract";

type FakeUserId = number;

interface MockBackendState {
  clicks: number;
  fakeUsersOnline: Set<FakeUserId>;
  nextFakeUserId: FakeUserId;
}

export class MockBackend {
  webSocketServer: Server;
  state: MockBackendState;
  url: string;

  /**
   * Mocks the websocket endpoint that this app will talk to in production.
   * Exposes methods that simulate the activity of other users.
   *
   * Set its URL as an environment variable, e.g. BACKEND_URL="ws://localhost:5000".
   * */
  constructor() {
    this.url = import.meta.env.BACKEND_URL;

    this.state = {
      clicks: 0,
      fakeUsersOnline: new Set(),
      nextFakeUserId: 0,
    };

    this.webSocketServer = new Server(this.url);
    this.webSocketServer.on("connection", (connectionToClient) => {
      connectionToClient.on("message", (data) => {
        const message = deserializeMessageFromFrontend(data.toString());

        switch (message.type) {
          case "user_clicked":
            this.state.clicks += message.data.number_of_times;
            this.broadcastClickCountChanged();
            break;
          default:
            throw Error(
              `Backend received invalid message type: ${message.type}`
            );
        }
      });
    });
  }

  simulateUserLaunchesApp(): FakeUserId {
    const newFakeUserID = this.state.nextFakeUserId;
    this.state.nextFakeUserId++;
    this.state.fakeUsersOnline.add(newFakeUserID);
    this.broadcastUsersOnlineChanged();
    return newFakeUserID;
  }

  simulateUserClosesApp(userId: FakeUserId) {
    const fakeUserExisted = this.state.fakeUsersOnline.delete(userId);
    if (fakeUserExisted) {
      this.broadcastUsersOnlineChanged();
    }
  }

  simulateUserClicksButton(userId: FakeUserId, numberOfTimes = 1) {
    if (!this.state.fakeUsersOnline.has(userId)) {
      throw Error(
        `No fake user with id(${userId}) exists. Are you sure you created one with .simulateUerLaunchesApp()?`
      );
    }

    this.state.clicks += numberOfTimes;
    this.broadcastClickCountChanged();
  }

  broadcastClickCountChanged() {
    const message: ClickCountChangedMessage = {
      type: "click_count_changed",
      data: { clicks: this.getClicks() },
    };

    const messageString = serializeMessageFromBackend(message);

    this.webSocketServer
      .clients()
      .forEach((client) => client.send(messageString));
  }

  broadcastUsersOnlineChanged() {
    const message: UsersOnlineChangedMessage = {
      type: "users_online_changed",
      data: { users_online: this.getUsersOnline() },
    };

    const messageString = serializeMessageFromBackend(message);

    this.webSocketServer
      .clients()
      .forEach((client) => client.send(messageString));
  }

  getUsersOnline(): number {
    return (
      this.webSocketServer.clients().length + this.state.fakeUsersOnline.size
    );
  }

  getClicks() {
    return this.state.clicks;
  }

  shutdown() {
    this.webSocketServer.close();
  }
}

function serializeMessageFromBackend(message: MessageFromBackend): string {
  return JSON.stringify(message);
}

function deserializeMessageFromFrontend(data: string): MessageFromFrontend {
  const message = JSON.parse(data) as MessageFromFrontend;

  const frontendMessageValidators = [isValid_UserClickedMessage];

  for (const isValid of frontendMessageValidators) {
    if (isValid(message)) return message;
  }

  throw Error(
    "Cannot deserialize message from frontend. The given data does not satisfy any known message contract."
  );
}

function isValid_UserClickedMessage(
  thing: unknown
): thing is UserClickedMessage {
  const message = thing as UserClickedMessage;
  return (
    message.type === "user_clicked" &&
    message.data?.number_of_times !== undefined
  );
}
