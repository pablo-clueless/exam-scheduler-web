import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import React from "react"

import Pagination from "components/pagination"
import { Button } from "components/ui/button"
import { instance, paginate } from "lib"
import { ExamOfficerProps } from "types"
import { endpoints } from "config"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "components/ui/table"

const Admins = () => {
	const [admins, setAdmins] = React.useState<ExamOfficerProps[]>([])
	const [page, setPage] = React.useState(1)

	const { data } = useQuery({
		queryFn: () =>
			instance.get(endpoints().exam_officers.all).then((res) => res.data),
		queryKey: ["get-Admins"],
	})
	React.useEffect(() => {
		if (data) {
			setAdmins(data)
		}
	}, [data])

	const paginated = paginate<ExamOfficerProps>(admins, page, 10)

	return (
		<div className="flex h-full w-full flex-col gap-5 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Admins</p>
			</div>
			<div className="flex h-[90dvh] w-full flex-col gap-10">
				<div className="h-[615px] w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Employee ID</TableHead>
								<TableHead>Employee Name</TableHead>
								<TableHead>Department</TableHead>
								<TableHead>Job Title</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((admin) => (
								<TableRow key={admin.id}>
									<TableCell>{admin.employee_id}</TableCell>
									<TableCell>{admin.exam_officer.full_name}</TableCell>
									<TableCell>{admin.job_title}</TableCell>
									<TableCell>{admin.department}</TableCell>
									<TableCell>
										<Link to={`/dashboard/Admins/${admin.id}`}>
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
					total={admins.length}
				/>
			</div>
		</div>
	)
}

export default Admins
