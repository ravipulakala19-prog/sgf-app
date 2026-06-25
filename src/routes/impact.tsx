import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/sgf/Stub";

export const Route = createFileRoute("/impact")({
  component: makeStub("Impact", "/impact"),
});
