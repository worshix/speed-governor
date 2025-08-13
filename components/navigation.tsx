"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Gauge, FileText } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Gauge className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Speed Governance</span>
          </div>

          <div className="flex space-x-4">
            <Button
              asChild
              variant={pathname === "/" ? "default" : "ghost"}
              className={cn("flex items-center space-x-2", pathname === "/" && "bg-blue-600 hover:bg-blue-700")}
            >
              <Link href="/">
                <Gauge className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/logs" ? "default" : "ghost"}
              className={cn("flex items-center space-x-2", pathname === "/logs" && "bg-blue-600 hover:bg-blue-700")}
            >
              <Link href="/logs">
                <FileText className="h-4 w-4" />
                <span>Logs</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
