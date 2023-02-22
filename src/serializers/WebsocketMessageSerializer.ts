import {
  MessageFromFrontend,
  MessageFromBackend,
  isValid_ClickCountChangedMessage,
  isValid_UsersOnlineChangedMessage,
} from "../contracts/WebsocketMessageContract";

export function serializeMessageFromFrontend(
  message: MessageFromFrontend
): string {
  return JSON.stringify(message);
}

export function deserializeMessageFromBackend(
  data: string
): MessageFromBackend {
  const message = JSON.parse(data);

  const backendMessageValidators = [
    isValid_ClickCountChangedMessage,
    isValid_UsersOnlineChangedMessage,
  ];

  for (const isValid of backendMessageValidators) {
    if (isValid(message)) return message;
  }

  throw Error(
    "Cannot deserialize message from backend. The given data does not satisfy any known message contract."
  );
}
