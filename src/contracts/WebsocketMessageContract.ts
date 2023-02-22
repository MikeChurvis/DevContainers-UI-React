/* BACKEND CONTRACT */

export interface ClickCountChangedMessage {
  type: "click_count_changed";
  data: { clicks: number };
}

export interface UsersOnlineChangedMessage {
  type: "users_online_changed";
  data: { users_online: number };
}

export type MessageFromBackend =
  | ClickCountChangedMessage
  | UsersOnlineChangedMessage;

/* FRONTEND CONTRACT */

export interface UserClickedMessage {
  type: "user_clicked";
  data: { number_of_times: number };
}

export type MessageFromFrontend = UserClickedMessage;

/* VALIDATORS */

export function isValid_MessageFromBackend(
  thing: unknown
): thing is MessageFromBackend {
  const message = thing as MessageFromBackend;
  return message.type !== undefined && message.data !== undefined;
}

export function isValid_ClickCountChangedMessage(
  thing: unknown
): thing is ClickCountChangedMessage {
  const message = thing as ClickCountChangedMessage;
  return (
    message.type === "click_count_changed" && message.data.clicks !== undefined
  );
}

export function isValid_UsersOnlineChangedMessage(
  thing: unknown
): thing is UsersOnlineChangedMessage {
  const message = thing as UsersOnlineChangedMessage;
  return (
    message.type === "users_online_changed" &&
    message.data.users_online !== undefined
  );
}
