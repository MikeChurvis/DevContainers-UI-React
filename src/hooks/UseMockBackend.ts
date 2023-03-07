import { useEffect, useRef, useState } from "react";
import { BackendConnectionStatus } from "../types/BackendTypes";
import { Server } from "mock-socket";
import { AppAction, UpdateAppStateAction } from "../types/AppTypes";

type FakeUserId = number;

export function useMockBackend(url: string) {
  // State

  const [clicks, setClicks] = useState(0);

  const [nextUserId, setNextUserId] = useState(0);

  const [connectionStatus, setConnectionStatus] =
    useState<BackendConnectionStatus>(BackendConnectionStatus.connecting);

  const fakeUsers = useRef<Set<FakeUserId>>(new Set());

  const mockBackend = useRef<Server | null>(null);

  // Lifecycle

  useEffect(() => {
    mockBackend.current = new Server(url);

    mockBackend.current?.on("connection", (client) => {
      client.on("message", (data) => {
        // FIXME: There is no validation here. Should there be?
        const dataObject = JSON.parse(data.toString()) as AppAction;

        switch (dataObject.type) {
          case "incrementClicks":
            setClicks(
              (oldClicks) => oldClicks + (dataObject.data?.byAmount || 1)
            );
        }
      });

      broadcastAppStateUpdate();
    });

    return () => mockBackend.current?.close();
  }, []);

  // Simulation

  function getUsersOnline(): number {
    const realUserCount = mockBackend.current?.clients().length || 0;
    return realUserCount + fakeUsers.current.size;
  }

  function generateUserId(): FakeUserId {
    const id = nextUserId;
    setNextUserId((lastUserId) => lastUserId + 1);
    return id;
  }

  function simulateUserLaunchedApp(): FakeUserId {
    const newFakeUserId = generateUserId();

    fakeUsers.current.add(newFakeUserId);

    broadcastAppStateUpdate();

    return newFakeUserId;
  }

  function simulateUserClosedApp(userId: FakeUserId) {
    if (!fakeUsers.current.has(userId)) {
      console.error("No fake user with the given ID exists.", userId);
      return;
    }

    fakeUsers.current.delete(userId);

    broadcastAppStateUpdate();
  }

  function simulateUserClickedButton(userId: FakeUserId) {
    if (!fakeUsers.current.has(userId)) {
      console.error("No fake user with the given ID exists.", userId);
      return;
    }

    setClicks((oldClicks) => oldClicks + 1);

    broadcastAppStateUpdate();
  }

  function broadcastAppStateUpdate() {
    const action: UpdateAppStateAction = {
      type: "updateAppState",
      data: {
        state: {
          clicks: clicks,
          usersOnline: getUsersOnline(),
        },
      },
    };

    mockBackend.current
      ?.clients()
      .forEach((client) => client.send(JSON.stringify(action)));
  }

  return {
    fakeUsers: fakeUsers.current,
    clicks,
    connectionStatus,
    getUsersOnline,
    setConnectionStatus,
    simulateUserLaunchedApp,
    simulateUserClosedApp,
    simulateUserClickedButton,
  };
}
