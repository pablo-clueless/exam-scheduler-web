import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import React from "react"

import { generateMatric, instance, paginate } from "lib"
import Pagination from "components/pagination"
import { Button } from "components/ui/button"
import { StudentProps } from "types"
import { endpoints } from "config"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "components/ui/table"

const Students = () => {
	const [students, setStudents] = React.useState<StudentProps[]>([])
	const [page, setPage] = React.useState(1)
	const navigate = useNavigate()

	const { data } = useQuery({
		queryFn: () => instance.get(endpoints().students.all).then((res) => res.data),
		queryKey: ["get-students"],
	})
	React.useEffect(() => {
		if (data) {
			setStudents(data)
		}
	}, [data])

	const paginated = paginate<StudentProps>(students, page, 10)

	return (
		<div className="flex h-full w-full flex-col gap-5 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Students</p>
			</div>
			<div className="flex h-[90dvh] w-full flex-col gap-10">
				<div className="h-[615px] w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Matric No</TableHead>
								<TableHead>Student Name</TableHead>
								<TableHead>Department</TableHead>
								<TableHead>Year</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((student, index) => (
								<TableRow key={student.id}>
									<TableCell>
										{generateMatric(student.student_reg_number, index + 1)}
									</TableCell>
									<TableCell>{student.student.full_name}</TableCell>
									<TableCell>{student.department}</TableCell>
									<TableCell>{student.year}</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												navigate(`/dashboard/students/${student.id}`, { state: student })
											}>
											View
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<Pagination
					current={page}
					onPageChange={(page) => setPage(page)}
					pageSize={10}
					total={students.length}
				/>
			</div>
		</div>
	)
}

export default Students
