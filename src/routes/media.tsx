import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/sgf/Stub";

export const Route = createFileRoute("/media")({
  component: makeStub("Media", "/media"),
});
