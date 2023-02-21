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

export interface UserClickedMessage {
  type: "user_clicked";
  data: { number_of_times: number };
}

export type MessageFromFrontend = UserClickedMessage;
