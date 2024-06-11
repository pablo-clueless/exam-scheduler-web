import { Outlet } from "react-router-dom"

import { ResizablePanel, ResizablePanelGroup } from "components/ui/resizable"
import { Appbar, Sidebar } from "components"
import { cn } from "lib/utils"

const DashboardLayout = () => {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			style={{ height: "100dvh" }}
			className={cn("w-full")}>
			<ResizablePanel className={cn("max-w-[300px]", "min-w-[300px]", "h-full")}>
				<Sidebar />
			</ResizablePanel>
			<ResizablePanel className="h-full w-full px-4">
				<Appbar />
				<div className="h-[93vh] w-full overflow-hidden">
					<Outlet />
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}

export default DashboardLayout
