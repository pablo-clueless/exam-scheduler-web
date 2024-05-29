import { Link, useLocation } from "react-router-dom"

import { SidebarLinks } from "config/links"
import User from "./user"

export const Sidebar = () => {
	const { pathname } = useLocation()
	const isOnPath = (path: string) => pathname === path

	return (
		<div className="flex h-full w-full flex-col justify-between border-r p-4">
			<div className="flex w-full flex-col gap-5">
				<p className="text-xl font-bold">Exam Scheduler</p>
				<div className="flex flex-col gap-4 border-y py-4">
					{SidebarLinks.map((link) => (
						<Link
							key={link.name}
							to={link.href}
							className={`flex w-full items-center gap-2 rounded-md p-2 text-sm ${isOnPath(link.href) ? "bg-black/30 font-semibold" : "text-gray-500"}`}>
							<link.icon size={24} /> {link.name}
						</Link>
					))}
				</div>
			</div>
			<User />
		</div>
	)
}
