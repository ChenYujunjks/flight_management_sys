import "@/style/globals.css";
import { Provider } from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

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
      <body className="bg-white text-gray-800">
        <header className="flex items-center p-4 bg-gray-100 shadow-sm">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-700 hover:text-blue-600 hover:underline transition-all duration-200"
          >
            Flight Management
          </Link>
        </header>

        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
