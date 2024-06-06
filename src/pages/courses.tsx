import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import React from "react"

import Pagination from "components/pagination"
import { Button } from "components/ui/button"
import { instance, paginate } from "lib"
import { CourseProps } from "types"
import { endpoints } from "config"
import { store } from "store"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "components/ui/table"

const Courses = () => {
	const [courses, setCourses] = React.useState<CourseProps[]>([])
	const [page, setPage] = React.useState(1)
	const { user } = store()

	const { data } = useQuery({
		queryFn: () => instance.get(endpoints().courses.all).then((res) => res.data),
		queryKey: ["get-courses"],
	})
	React.useEffect(() => {
		if (data) {
			setCourses(data)
		}
	}, [data])

	const paginated = paginate<CourseProps>(courses, page, 10)

	return (
		<div className="flex h-full w-full flex-col gap-5 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Courses</p>
				<Link to="/dashboard/courses/create">
					{user?.role === "exam_officer" && <Button>Add Course</Button>}
				</Link>
			</div>
			<div className="flex h-[90dvh] w-full flex-col gap-10">
				<div className="h-[615px] w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Course Name</TableHead>
								<TableHead>Course Code</TableHead>
								<TableHead>Department</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((course) => (
								<TableRow key={course.id}>
									<TableCell>{course.id}</TableCell>
									<TableCell>{course.course_name}</TableCell>
									<TableCell>{course.course_code}</TableCell>
									<TableCell>{course.department}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<Pagination
					current={page}
					onPageChange={(page) => setPage(page)}
					pageSize={10}
					total={courses.length}
				/>
			</div>
		</div>
	)
}

export default Courses
