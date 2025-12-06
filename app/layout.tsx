import "./globals.css";
import Navbar from "@/components/nav/Navbar";  

export const metadata = {
  title: {
    default: "LOGO",
    template: "%s | LOGO",
  },
  description: "T-shirt platform App",
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
