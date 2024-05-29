import { store } from "store"

export const Appbar = () => {
	const { user } = store()

	return (
		<nav className="flex w-full items-center justify-center border-b py-[18px] text-black">
			<div className="flex w-full max-w-[1200px] items-center justify-between">
				<p className="text-xl font-bold">Hi, {user?.full_name}</p>
			</div>
		</nav>
	)
}
