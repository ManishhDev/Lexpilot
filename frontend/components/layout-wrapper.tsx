"use client"

import { useAuth } from "@/lib/auth-context"
import Header from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  console.log(pathname)
  // Check if we're on a page that should show the sidebar
  const showSidebar = mounted && user && pathname && ![
    "/",
    "/features",
    "/how-it-works",
    "/technology",
    "/market",
    "/pricing",
    "/login",
    "/onboarding",
    "/signup"
  ].includes(pathname)

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen legal-bg-primary" suppressHydrationWarning>
        <Header />
        <main suppressHydrationWarning>{children}</main>
      </div>
    )
  }

  if (showSidebar) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full legal-bg-primary" suppressHydrationWarning>
          <AppSidebar />
          <div className="flex-1 flex flex-col" suppressHydrationWarning>
            <main className="flex-1 overflow-auto" suppressHydrationWarning>
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <div className="min-h-screen legal-bg-primary" suppressHydrationWarning>
      <Header />
      <main suppressHydrationWarning>{children}</main>
    </div>
  )
}
