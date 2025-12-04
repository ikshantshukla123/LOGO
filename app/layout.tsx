import "./globals.css";
import Navbar from "@/components/nav/Navbar";  

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
    
       {children}
      </body>
    </html>
  );
}
