import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { useGithub } from "../../../../../keystatic.config";

const handlers = makeRouteHandler({ config });
const enabled = process.env.NODE_ENV !== "production" || useGithub;
const off = () => new Response("Not found", { status: 404 });

export const GET = enabled ? handlers.GET : off;
export const POST = enabled ? handlers.POST : off;
