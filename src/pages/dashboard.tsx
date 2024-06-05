import { useQuery } from "@tanstack/react-query"
import React from "react"

import { endpoints } from "config"
import { instance } from "lib"
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
			{user?.role === "exam_officer" && (
				<div className="grid w-full grid-cols-2 gap-10"></div>
			)}
			{user?.role === "supervisor" && (
				<div className="grid w-full grid-cols-2 gap-10"></div>
			)}
			{user?.role === "student" && (
				<div className="grid w-full grid-cols-2 gap-10">
					<div className="flex w-full flex-col gap-4 rounded-md border bg-gray-300 p-4">
						<p className="text-xl font-medium">Registered Courses</p>
						<div className="flex w-full flex-col">
							{registeredCourses.map((_, index) => (
								<div key={index}>{index}</div>
							))}
						</div>
					</div>
					<div className="flex w-full flex-col gap-4 rounded-md border bg-gray-300 p-4">
						<p className="text-xl font-medium">Next Examination</p>
						<div></div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Dashboard
