import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Redux } from './redux'
import { ThemeProvider } from 'next-themes'
import { Antdesign } from './antdesign'
import { Nextui } from './nextui'
import "#/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dx",
  description: "Flawless Developing Experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Redux>
            <Antdesign>
              <Nextui>
                <main>{children}</main>
              </Nextui>
            </Antdesign>
        </Redux>
      </body>
    </html>
  );
}

// 2xs:bg-yellow-500 
// xs:bg-green-500 
// sm:bg-blue-500 
// md:bg-purple-500 
// lg:bg-indigo-500 
// xl:bg-pink-500 
// 2xl:bg-red-500