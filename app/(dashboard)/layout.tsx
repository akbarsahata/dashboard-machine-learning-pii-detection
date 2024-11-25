import { Analytics } from "@vercel/analytics/react";
import Providers from "./providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col">
          <main className="grid flex-1 items-start gap-2 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}
