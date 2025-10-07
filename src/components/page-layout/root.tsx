import React from "react"

export default function PageLayoutRoot({ children }: { children: React.ReactNode}) {
  return (
    <div className="drawer lg:drawer-open">
      {children}
    </div>
  )
}