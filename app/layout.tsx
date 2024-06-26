import type { Metadata } from "next"
import "./globals.css"
import SideBar from "@/components/SideBar"
import { SessionProvider } from "@/components/SessionProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import Login from "@/components/Login"
import ClientProvider from "@/components/ClientProvider"

export const metadata: Metadata = {
  title: "ChatGPT Messenger Clone App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
              <Login />
            ) : (
              <div className="flex">
                <div className="bg-[#171717] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                  <SideBar />
                </div>
      
                <ClientProvider />
      
                <div className="flex-1 bg-[#212121]">
                  {children}
                </div>
              </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
