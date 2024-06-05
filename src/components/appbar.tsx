import { store } from "store"

import { Button } from "./ui/button"
import { sanitize } from "lib"

export const Appbar = () => {
	const { signOut, user } = store()

	return (
		<nav className="flex w-full items-center justify-center border-b py-[18px] text-black">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Hi, {user?.full_name}</p>
				<div className="flex items-center gap-4">
					<p className="text-xl font-medium capitalize">
						{sanitize(String(user?.role))}
					</p>
					<Button onClick={signOut} variant="destructive" size="sm">
						Log Out
					</Button>
				</div>
			</div>
		</nav>
	)
}
