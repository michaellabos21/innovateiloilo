import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { useGithub } from "../../../../../keystatic.config";

const off = () => new Response("Not found", { status: 404 });

// In production the admin only exists in GitHub mode, and only once every secret is present.
// Keystatic throws while setting up if any are missing, which would otherwise fail the whole build.
const githubReady =
  useGithub &&
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && process.env.KEYSTATIC_SECRET,
  );
const enabled = process.env.NODE_ENV !== "production" || githubReady;

const handlers = enabled ? makeRouteHandler({ config }) : { GET: off, POST: off };

export const GET = handlers.GET;
export const POST = handlers.POST;
