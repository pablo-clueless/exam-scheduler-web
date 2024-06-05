import { Avatar, AvatarFallback } from "./ui/avatar"
import { getInitials } from "lib"
import { store } from "store"

const User = () => {
	const { user } = store()

	return (
		<div className="flex min-h-[100px] w-full items-center gap-2">
			<Avatar className="size-12">
				<AvatarFallback className="text-2xl">
					{getInitials(String(user?.full_name))}
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				<p className="font-semibold">{user?.full_name}</p>
				<p className="text-xs">{user?.email}</p>
			</div>
		</div>
	)
}

export default User
