import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";

export const metadata = { title: "Innovate Iloilo CMS", robots: { index: false } };

// The admin has its own root layout so it doesn't inherit the site's header, footer or styles.
export default function Layout() {
  // Local mode writes straight to disk, so it is only ever available in development.
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github") notFound();
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
