import { store } from "store"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import { UserImage } from "assets"

const User = () => {
	const { user } = store()

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex items-center gap-4">
				<img
					src={UserImage}
					alt=""
					className="size-36 rounded-full border object-cover"
				/>
				<div className="flex flex-col">
					<h2 className="text-3xl font-bold capitalize">{user?.full_name}</h2>
					<p className="">{user?.email}</p>
				</div>
			</div>
			<div className="h-[72dvh] w-full">
				<Tabs defaultValue="profile">
					<TabsList className="">
						<TabsTrigger
							className="min-w-[150px] transition-all hover:bg-gray-200"
							value="profile">
							Profile
						</TabsTrigger>
						<TabsTrigger
							className="min-w-[150px] transition-all hover:bg-gray-200"
							value="security">
							Security
						</TabsTrigger>
						<TabsTrigger
							className="min-w-[150px] transition-all hover:bg-gray-200"
							value="settings">
							Settings
						</TabsTrigger>
					</TabsList>
					<TabsContent value="profile">Profile</TabsContent>
					<TabsContent value="security">Security</TabsContent>
					<TabsContent value="settings">Settings</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

export default User
