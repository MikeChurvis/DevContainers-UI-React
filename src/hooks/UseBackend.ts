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
      webSocket.current = new WebSocket(options.url);
      webSocket.current.onmessage = handleMessageReceived;
      webSocket.current.onopen = handleConnectionOpened;
      webSocket.current.onerror = handleConnectionError;
      webSocket.current.onclose = handleConnectionClosed;
    }, 1000);

    return () => webSocket.current?.close();
  }, []);

  // Event handlers

  function handleMessageReceived(event: MessageEvent) {
    const message = deserializeAction(event.data);

    if (!message) return;

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
  function notifyOfAction(action: AppAction) {
    const message = serializeAction(action);

    webSocket.current?.send(message);
  }

  return { connectionStatus, notifyOfAction };
}

function serializeAction(action: AppAction): string {
  return JSON.stringify(action);
}

/**
 * Deserialize a message JSON string into a message object.
 * If this is not possible,
 * then the relevant error will be posted to the console
 * and this function will return null.
 *
 * @param messageEventData The message as a string.
 * @returns The message as an object.
 */
function deserializeAction(messageEventData: unknown): AppAction | null {
  try {
    if (typeof messageEventData !== "string") {
      throw Error(
        `The message data must be received as a string, not ${typeof messageEventData}.`
      );
    }

    const message = JSON.parse(messageEventData) as object;

    if (!messageIsAppAction(message)) {
      throw Error(`The message is not a valid app action. ${messageEventData}`);
    }

    return message as AppAction;
  } catch (error) {
    console.error(
      "An error occured when attempting to deserialize an action.",
      error
    );
  }

  return null;
}

const actionTypes = ["incrementClicks", "updateAppState"] satisfies Iterable<
  AppAction["type"]
>;

function messageIsAppAction(message: object): message is AppAction {
  if (!actionTypes.includes((message as AppAction).type)) return false;

  // TODO: More exhaustive validation?

  return true;
}
