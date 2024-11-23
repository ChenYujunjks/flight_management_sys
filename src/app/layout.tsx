import "@/style/globals.css";
import { Provider } from "@/components/provider";

export const metadata = {
  title: "Flights",
  description: "Manage your journey in one app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
