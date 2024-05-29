import { Link } from "react-router-dom"

import { UserImage } from "assets"
import { store } from "store"

const User = () => {
	const { user } = store()

	return (
		<Link
			to="/dashboard/user"
			className="flex min-h-[100px] w-full items-center gap-2">
			<img
				src={UserImage}
				alt={user?.full_name}
				className="size-12 rounded-full border object-cover"
			/>
			<div className="flex flex-col">
				<p className="font-semibold">{user?.full_name}</p>
				<p className="text-xs">{user?.email}</p>
			</div>
		</Link>
	)
}

export default User
