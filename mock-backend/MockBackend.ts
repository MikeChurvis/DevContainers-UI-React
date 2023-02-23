import express from "express";
import expressWs from "express-ws";
import {
  MessageFromBackend,
  MessageFromFrontend,
  UserClickedMessage,
  UsersOnlineChangedMessage,
  ClickCountChangedMessage,
} from "../src/contracts/WebsocketMessageContract";

const port = 5000;

const expressWsInstance = expressWs(express());
const webSocketServer = expressWsInstance.getWss();
const app = expressWsInstance.app;

// type FakeUserId = number;

// interface MockBackendState {
//   clicks: number;
//   fakeUsersOnline: Set<FakeUserId>;
//   nextFakeUserId: FakeUserId;
// }

const state = {
  clicks: 0,
  fakeUsersOnline: new Set(),
  nextFakeUserId: 0,
};

app.get("/", (request, response) => {
  response.send("Hello World!");
});

/** Establish websocket connection */
app.ws("/", (ws) => {
  ws.on("message", (data) => {
    const message = deserializeMessageFromFrontend(data.toString());
    switch (message.type) {
      case "user_clicked":
        state.clicks += message.data.number_of_times;
        broadcastClickCountChanged();
        break;
      default:
        throw Error(`Backend received invalid message type: ${message.type}`);
    }
  });
});

/** Simulate user launches app. */
app.get("/fake-users/launch-app", (request, response) => {
  const newFakeUserID = state.nextFakeUserId;
  state.nextFakeUserId++;
  state.fakeUsersOnline.add(newFakeUserID);

  broadcastUsersOnlineChanged();

  return response.send({
    success: `A fake user has launched the app. Clients have been notified.`,
    fakeUserId: newFakeUserID,
  });
});

/** All actions taken by a fake user must guarantee that that fake user exists. */
app.all("/fake-users/id/:fakeUserId/*", (request, response, next) => {
  const fakeUserId = Number.parseInt(request.params.fakeUserId);

  if (!state.fakeUsersOnline.has(fakeUserId)) {
    return response.send({
      error: `No fake user with id(${fakeUserId}) exists. Create one by requesting 'GET /fakeusers/launch-app'.`,
    });
  }

  next();
});

/** Simulate user clicks the button. */
app.get(
  "/fake-users/id/:fakeUserId/click/:numberOfTimes",
  (request, response) => {
    const numberOfTimes = Number.parseInt(request.params.numberOfTimes);

    state.clicks += numberOfTimes;
    broadcastClickCountChanged();

    return response.send({
      success: `Click count changed by fake user. Clients have been notified.`,
      clicks: state.clicks,
    });
  }
);

/** Simulate user closes app. */
app.get("/fake-users/id/:fakeUserId/close-app", (request, response) => {
  const fakeUserId = Number.parseInt(request.params.fakeUserId);

  state.fakeUsersOnline.delete(fakeUserId);
  broadcastUsersOnlineChanged();

  return response.send({
    success: `Fake user has closed the app. Clients have been notified.`,
    fakeUserId: fakeUserId,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function broadcastUsersOnlineChanged() {
  const message: UsersOnlineChangedMessage = {
    type: "users_online_changed",
    data: { users_online: getUsersOnline() },
  };

  webSocketServer.clients.forEach((client) =>
    client.send(serializeMessageFromBackend(message))
  );
}

function broadcastClickCountChanged() {
  const message: ClickCountChangedMessage = {
    type: "click_count_changed",
    data: { clicks: getClicks() },
  };

  webSocketServer.clients.forEach((client) =>
    client.send(serializeMessageFromBackend(message))
  );
}

function getClicks() {
  return state.clicks;
}

function getUsersOnline() {
  return state.fakeUsersOnline.size + webSocketServer.clients.size;
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
