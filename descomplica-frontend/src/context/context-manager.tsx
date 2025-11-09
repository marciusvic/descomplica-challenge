import type { ChildrenProps } from "../types/types";
import StudentProvider from "./stundet-context";

export function ContextManager({ children }: ChildrenProps) {
  return (
    <>
      <StudentProvider>{children}</StudentProvider>
    </>
  );
}
