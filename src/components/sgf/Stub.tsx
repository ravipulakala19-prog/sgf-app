import { createFileRoute, Link } from "@tanstack/react-router";

function makeStub(title: string, path: string) {
  return function Stub() {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{title}</p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-blue">{title}</h1>
        <p className="mt-4 text-muted-foreground">
          This page is coming next. The full {title} experience is being prepared.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-bold text-blue-foreground"
        >
          Back to Home
        </Link>
        <span className="sr-only">{path}</span>
      </section>
    );
  };
}

export { makeStub };
