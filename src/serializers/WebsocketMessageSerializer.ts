import {
  MessageFromFrontend,
  MessageFromBackend,
  ClickCountChangedMessage,
  UsersOnlineChangedMessage,
} from "../contracts/WebsocketMessageContract";

export function serializeMessageFromFrontend(
  message: MessageFromFrontend
): string {
  return JSON.stringify(message);
}

export function deserializeMessageFromBackend(
  data: string
): MessageFromBackend {
  const message = JSON.parse(data) as MessageFromBackend;

  switch (message.type) {
    case "click_count_changed":
      return message as ClickCountChangedMessage;
    case "users_online_changed":
      return message as UsersOnlineChangedMessage;
    default:
      throw Error(
        `Deserialization failed. Message must have a valid "type" property as defined in src/contracts/WebsocketMessageContract. Received instead: ${data}`
      );
  }
}
