import { Dispatch, useEffect, useState } from "react";
import { UserClickedMessage } from "../contracts/WebsocketMessageContract";
import { AppStateAction } from "../reducers/AppStateReducer";
import {
  deserializeMessageFromBackend,
  serializeMessageFromFrontend,
} from "../serializers/WebsocketMessageSerializer";

export function useBackend(performAction: Dispatch<AppStateAction>) {
  const [connection, setConnection] = useState<WebSocket>();

  const [backendConnectionStatus, setBackendConnectionStatus] =
    useState<BackendConnectionStatus>("connecting");

  useEffect(() => {
    const _connection = connectToWebSocketBackend({
      onOpen() {
        setBackendConnectionStatus("open");
      },
      onClose() {
        setBackendConnectionStatus("closed");
      },
      onMessage(messageEvent: MessageEvent) {
        const message = deserializeMessageFromBackend(messageEvent.data);

        switch (message.type) {
          case "click_count_changed":
            performAction({
              type: "set_clicks",
              clicks: message.data.clicks,
            });
            break;
          case "users_online_changed":
            performAction({
              type: "set_users_online",
              usersOnline: message.data.users_online,
            });
            break;
        }
      },
    });
    setConnection(_connection);

    return () => {
      _connection.close();
      setConnection(undefined);
      setBackendConnectionStatus("closed");
    };
  }, []);

  function notifyUserClicked() {
    if (connection === undefined) {
      console.error(
        "Cannot notify the backend that the user clicked because the connection has not yet been created."
      );
      return;
    }

    switch (connection.readyState) {
      case WebSocket.CONNECTING:
        console.error(
          "Cannot notify the backend that the user clicked because the connection is still being established."
        );
        return;
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        console.error(
          "Cannot notify the backend that the user clicked because the connection is closed."
        );
        return;
    }

    const message: UserClickedMessage = {
      type: "user_clicked",
      data: { number_of_times: 1 },
    };

    connection.send(serializeMessageFromFrontend(message));
  }

  return { backend: { status: backendConnectionStatus, notifyUserClicked } };
}

type BackendConnectionStatus = "connecting" | "closed" | "open";

interface WebSocketBackendCallbacks {
  onOpen: (event: Event) => void;
  onMessage: (event: MessageEvent) => void;
  onError: (event: Event) => void;
  onClose: (event: CloseEvent) => void;
}

function connectToWebSocketBackend(
  callbacks: Partial<WebSocketBackendCallbacks>
) {
  const allCallbacks: WebSocketBackendCallbacks = {
    onOpen: () => null,
    onMessage: () => null,
    onError: () => null,
    onClose: () => null,
    ...callbacks,
  };

  const webSocket = new WebSocket(
    `ws://${import.meta.env.VITE_WEBSOCKET_BACKEND_URL}`
  );

  webSocket.addEventListener("open", allCallbacks.onOpen);
  webSocket.addEventListener("message", allCallbacks.onMessage);
  webSocket.addEventListener("error", allCallbacks.onError);
  webSocket.addEventListener("close", allCallbacks.onClose);

  return webSocket;
}
