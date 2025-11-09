import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// Inicia o servidor de mock
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Limpa após cada teste
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Para o servidor após todos os testes
afterAll(() => server.close());
