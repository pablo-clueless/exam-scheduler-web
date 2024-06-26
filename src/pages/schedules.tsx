import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import React from "react"

import { formatDate, instance, paginate } from "lib"
import Pagination from "components/pagination"
import { Button } from "components/ui/button"
import { ScheduleProps } from "types"
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

const Schedules = () => {
	const [schedules, setSchedules] = React.useState<ScheduleProps[]>([])
	const [page, setPage] = React.useState(1)
	const navigate = useNavigate()
	const { user } = store()

	const { data } = useQuery({
		queryFn: () =>
			instance.get(endpoints().exam_schedules.all).then((res) => res.data),
		queryKey: ["get-exam_schedules"],
	})
	React.useEffect(() => {
		if (data) {
			setSchedules(data)
		}
	}, [data])

	const paginated = paginate<ScheduleProps>(schedules, page, 10)

	return (
		<div className="flex h-full w-full flex-col gap-5 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Schedules</p>
				<Link to="/dashboard/schedules/create">
					{user?.role === "exam_officer" && <Button>Add Schedule</Button>}
				</Link>
			</div>
			<div className="flex h-[90dvh] w-full flex-col gap-10">
				<div className="h-[615px] w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>S/N</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Venue</TableHead>
								<TableHead>Exam Officer</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((schedule, index) => (
								<TableRow key={index + 1}>
									<TableCell>{formatDate(schedule.date_time)}</TableCell>
									<TableCell className="capitalize">{schedule.venue}</TableCell>
									<TableCell>{schedule.exam_officer.exam_officer.full_name}</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												navigate(`/dashboard/schedules/${schedule.id}`, {
													state: schedule,
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
					total={schedules.length}
				/>
			</div>
		</div>
	)
}

export default Schedules
