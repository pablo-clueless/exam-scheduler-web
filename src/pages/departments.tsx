import { useQuery } from "@tanstack/react-query"
import React from "react"

import Pagination from "components/pagination"
import { instance, paginate } from "lib"
import { DepartmentProps } from "types"
import { endpoints } from "config"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "components/ui/table"

const Departments = () => {
	const [departments, setDepartments] = React.useState<DepartmentProps[]>([])
	const [page, setPage] = React.useState(1)

	const { data } = useQuery({
		queryFn: () =>
			instance.get(endpoints().departments.all).then((res) => res.data),
		queryKey: ["get-departments"],
	})
	React.useEffect(() => {
		if (data) {
			setDepartments(data)
		}
	}, [data])

	const paginated = paginate<DepartmentProps>(departments, page, 10)

	return (
		<div className="flex h-full w-full flex-col gap-5 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Departments</p>
			</div>
			<div className="flex h-[90dvh] w-full flex-col gap-10">
				<div className="h-[615px] w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>S/N</TableHead>
								<TableHead>Department Name</TableHead>
								<TableHead>Faculty</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((department, index) => (
								<TableRow key={department.id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell className="capitalize">
										{department.department_name}
									</TableCell>
									<TableCell className="capitalize">
										{department.faculty.faculty_name}
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
					total={departments.length}
				/>
			</div>
		</div>
	)
}

export default Departments
