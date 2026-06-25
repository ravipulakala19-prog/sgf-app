import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/sgf/Stub";

export const Route = createFileRoute("/what-we-do")({
  component: makeStub("What We Do", "/what-we-do"),
});
