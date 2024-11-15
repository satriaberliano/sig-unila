import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
});
const jakarta_sans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic-ext"],
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
        <meta
          name="google-site-verification"
          content="SvtqedkfhJV7lnw5BwjyXXKWaMRkUmX5LuMz5d5AKnA"
        />
      </head>
      <body className={jakarta_sans.className}>{children}</body>
    </html>
  );
}
