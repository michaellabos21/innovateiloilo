import { useGithub } from "../../../../keystatic.config";

// Setup check for the CMS: reports which settings the running build can see.
// Only yes/no and lengths are returned, never the values themselves.
export async function GET() {
  const has = (name: string) => Boolean(process.env[name]);
  const storage = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE;
  return Response.json({
    githubMode: useGithub,
    storageSeenAtRuntime: storage === undefined ? "missing" : `${storage.length} characters`,
    slug: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG ?? "missing",
    clientId: has("KEYSTATIC_GITHUB_CLIENT_ID"),
    clientSecret: has("KEYSTATIC_GITHUB_CLIENT_SECRET"),
    secret: has("KEYSTATIC_SECRET"),
    secretLongEnough: (process.env.KEYSTATIC_SECRET ?? "").length >= 32,
    vercelEnv: process.env.VERCEL_ENV ?? "not on Vercel",
  });
}
