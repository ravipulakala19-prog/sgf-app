import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/sgf/Stub";

export const Route = createFileRoute("/donate")({
  component: makeStub("Donate", "/donate"),
});
