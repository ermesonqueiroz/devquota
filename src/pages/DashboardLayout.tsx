import { Outlet } from "react-router";
import { PageLayout } from "../components/page-layout";

export default function DashboardLayout() {
  return (
    <PageLayout.Root>
      <PageLayout.Sidebar />
      <div className="relative max-w-screen drawer-content">
        <Outlet />
      </div>
    </PageLayout.Root>
  )
}
