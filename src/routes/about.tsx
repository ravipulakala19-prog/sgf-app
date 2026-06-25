import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/sgf/Stub";

export const Route = createFileRoute("/about")({
  component: makeStub("About", "/about"),
});
