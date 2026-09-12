import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter=Inter({subsets:["latin"],variable:"--font-inter"});
const space=Space_Grotesk({subsets:["latin"],variable:"--font-space"});

export const metadata={title:"AI & Data Science 2021 — Yusuf Fakhri Aldrian",description:"An interactive archive of AI & Data Science coursework from 2021."};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body className={`${inter.variable} ${space.variable}`}>{children}</body></html>;
}