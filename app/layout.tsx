import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "My App",
  description: "Professional App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}
