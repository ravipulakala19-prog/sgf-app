import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/sgf/Stub";

export const Route = createFileRoute("/volunteer")({
  component: makeStub("Volunteer", "/volunteer"),
});
