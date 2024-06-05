import { useQuery } from "@tanstack/react-query"
import React from "react"

import { Avatar, AvatarFallback } from "components/ui/avatar"
import { getInitials, instance, sanitize } from "lib"
import { Button } from "components/ui/button"
import { endpoints } from "config"
import { store } from "store"

const Dashboard = () => {
	const [registeredCourses] = React.useState([])
	const { user } = store()

	const { data } = useQuery({
		queryFn: () =>
			instance
				.get(endpoints(String(user?.id)).students.get_registered_courses)
				.then((res) => res.data),
		queryKey: ["get-registered-course"],
		enabled: user?.role === "student",
	})
	React.useEffect(() => {
		if (data) {
			console.log(data)
		}
	}, [data])

	return (
		<div className="flex h-full w-full flex-col gap-10 overflow-y-scroll p-5">
			<div className="grid w-full grid-cols-2 gap-10">
				<div className="flex h-full w-full flex-col gap-4 overflow-y-scroll">
					<div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-4 rounded-md border bg-black/30 p-4">
						<Avatar className="size-40">
							<AvatarFallback className="text-4xl">
								{getInitials(String(user?.full_name))}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col items-center text-center">
							<h2 className="text-2xl">{user?.full_name}</h2>
							<p className="font-bold">{user?.email}</p>
							<p className="font-bold capitalize">{sanitize(String(user?.role))}</p>
						</div>
					</div>
				</div>
				<div className="flex h-full w-full flex-col gap-4 overflow-y-scroll">
					{user?.role === "exam_officer" && (
						<div className="flex w-full flex-col gap-10">
							<div className="flex min-h-[500px] w-full flex-col gap-4 rounded-md border bg-black/30 p-4">
								<p className="text-xl font-medium">Schedule</p>
							</div>
						</div>
					)}
					{user?.role === "supervisor" && (
						<div className="flex w-full flex-col gap-10">
							<div className="flex min-h-[500px] w-full flex-col gap-4 rounded-md border bg-black/30 p-4">
								<p className="text-xl font-medium">Schedule</p>
							</div>
						</div>
					)}
					{user?.role === "student" && (
						<div className="flex w-full flex-col gap-10">
							<div className="flex min-h-[500px] w-full flex-col gap-4 rounded-md border bg-black/30 p-4">
								<div className="flex w-full items-center justify-between">
									<p className="text-xl font-medium">Registered Courses</p>
									<Button size="sm"></Button>
								</div>
								<div className="flex w-full flex-col">
									{registeredCourses.map((_, index) => (
										<div key={index}>{index}</div>
									))}
								</div>
							</div>
							<div className="flex min-h-[500px] w-full flex-col gap-4 rounded-md border bg-black/30 p-4">
								<p className="text-xl font-medium">Next Examination</p>
								<div></div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Dashboard
