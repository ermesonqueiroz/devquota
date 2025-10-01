import React from "react"

export default function PageLayoutRoot({ children }: { children: React.ReactNode}) {
  return (
    <div className="drawer lg:drawer-open bg-base-300">
      {children}
    </div>
  )
}