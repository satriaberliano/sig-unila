import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "SIG UNILA",
  description:
    "Website provide information facilities in Lampung University for student and guest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
