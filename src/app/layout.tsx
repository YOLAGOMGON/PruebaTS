import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Proyecto Widgets",
  description: "Proyecto basico con Next.js, JWT y CRUD."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
