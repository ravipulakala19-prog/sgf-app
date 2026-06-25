import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/sgf/Stub";

export const Route = createFileRoute("/contact")({
  component: makeStub("Contact", "/contact"),
});
