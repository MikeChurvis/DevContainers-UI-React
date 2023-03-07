import { Dispatch, useEffect, useState, useRef } from "react";
import type { AppAction, AppState } from "../types/AppTypes";
import { BackendConnectionStatus } from "../types/BackendTypes";

/**
 * Connects to a websocket endpoint. Sends and receives messages,
 * and updates the app state when necessary.
 * @param options
 */
export function useBackend(options: {
  url: string;
  state: AppState;
  dispatch: Dispatch<AppAction>;
}) {
  // State

  const [connectionStatus, setConnectionStatus] =
    useState<BackendConnectionStatus>(BackendConnectionStatus.connecting);

  const webSocket = useRef<WebSocket | null>(null);

  // Lifecycle

  useEffect(() => {
    // FIXME: this is a hack to allow the mock backend time to spin up.
    setTimeout(() => {
      console.log(`[frontend] Opening a new websocket connection.`);
      webSocket.current = new WebSocket(options.url);
      webSocket.current.onmessage = handleMessage;
      webSocket.current.onopen = handleConnectionOpened;
      webSocket.current.onerror = handleConnectionError;
      webSocket.current.onclose = handleConnectionClosed;
    }, 1000);

    return () => webSocket.current?.close();
  }, []);

  // Event handlers

  function handleMessage(event: MessageEvent) {
    const message = event.data;

    try {
      if (!message) throw Error("Message is empty or non-existent.");

      const action = JSON.parse(message);

      if (action.type === undefined) throw Error("Message has no type.");
    } catch (error) {
      console.warn(
        `[frontend] Message received but is not recognized.`,
        error,
        message
      );
    }

    console.log(`[frontend] Action dispatched from websocket.`, message);

    options.dispatch(message);
  }

  function handleConnectionOpened() {
    console.log("The websocket connection is open.");
    setConnectionStatus(BackendConnectionStatus.open);
  }

  function handleConnectionError(event: Event) {
    console.error("The websocket endpoint responded with an error.", event);
    setConnectionStatus(BackendConnectionStatus.closed);
  }

  function handleConnectionClosed(event: CloseEvent) {
    console.warn("The websocket connection was closed.", event);
    setConnectionStatus(BackendConnectionStatus.closed);
  }

  // TODO: communicate user action to the backend
  function notify(message: "click") {
    // const message = serializeAction(action);

    console.log(`[frontend] Notifying backend of click.`);

    webSocket.current?.send(message);
  }

  return { connectionStatus, notify };
}
