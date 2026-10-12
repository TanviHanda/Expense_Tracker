import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="ml-64 flex flex-1 min-w-0 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
