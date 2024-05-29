import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import React from "react"

import Pagination from "components/pagination"
import { Button } from "components/ui/button"
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
				<Link to="/dashboard/departments/create">
					<Button>Add Department</Button>
				</Link>
			</div>
			<div className="flex h-[90dvh] w-full flex-col gap-10">
				<div className="h-[615px] w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Department Name</TableHead>
								<TableHead>Faculty</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((department) => (
								<TableRow key={department.id}>
									<TableCell>{department.id}</TableCell>
									<TableCell>{department.department_name}</TableCell>
									<TableCell>{department.faculty}</TableCell>
									<TableCell>
										<Link to={`/dashboard/departments/${department.id}`}>
											<Button>View</Button>
										</Link>
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
