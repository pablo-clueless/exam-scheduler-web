import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import React from "react"

import Pagination from "components/pagination"
import { Button } from "components/ui/button"
import { instance, paginate } from "lib"
import { SupervisorProps } from "types"
import { endpoints } from "config"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "components/ui/table"

const Supervisors = () => {
	const [supervisors, setSupervisors] = React.useState<SupervisorProps[]>([])
	const [page, setPage] = React.useState(1)
	const navigate = useNavigate()

	const { data } = useQuery({
		queryFn: () =>
			instance.get(endpoints().supervisors.all).then((res) => res.data),
		queryKey: ["get-supervisors"],
	})
	React.useEffect(() => {
		if (data) {
			setSupervisors(data)
		}
	}, [data])

	const paginated = paginate<SupervisorProps>(supervisors, page, 10)

	return (
		<div className="flex h-full w-full flex-col gap-5 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Supervisors</p>
			</div>
			<div className="flex h-[90dvh] w-full flex-col gap-10">
				<div className="h-[615px] w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Employee ID</TableHead>
								<TableHead>Employee Name</TableHead>
								<TableHead>Job Title</TableHead>
								<TableHead>Department</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((supervisor) => (
								<TableRow key={supervisor.id}>
									<TableCell>{supervisor.employee_id}</TableCell>
									<TableCell>{supervisor.supervisor.full_name}</TableCell>
									<TableCell>{supervisor.job_title}</TableCell>
									<TableCell>{supervisor.department}</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												navigate(`/dashboard/supervisors/${supervisor.id}`, {
													state: supervisor,
												})
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
					total={supervisors.length}
				/>
			</div>
		</div>
	)
}

export default Supervisors
