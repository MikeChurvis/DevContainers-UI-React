import { useEffect, useRef } from "react";
import { MockBackend } from "../mocks/MockBackend";

export function useMockBackend(url: string) {
  const mockBackend = useRef<MockBackend | null>(null);

  useEffect(() => {
    mockBackend.current = new MockBackend(url);
    return () => mockBackend.current?.shutdown();
  }, []);

  return mockBackend;
}
