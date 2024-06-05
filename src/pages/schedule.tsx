import { useLocation, useNavigate } from "react-router-dom"
import React from "react"

import { Button } from "components/ui/button"
import { ScheduleProps } from "types"
import { formatDate } from "lib"

const Schedule = () => {
	const [schedule, setSchedule] = React.useState<ScheduleProps>()
	const { state } = useLocation()
	const navigate = useNavigate()

	React.useEffect(() => {
		setSchedule(state)
	}, [state])

	if (!schedule) return null

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Schedule {schedule.id}</p>
				<Button onClick={() => navigate(-1)}>Back</Button>
			</div>
			<div className="h-[90dvh] w-full">
				<div className="flex w-full flex-col gap-4">
					<div>
						<h4 className="text-2xl">Date</h4>
						<p className="text-2xl font-bold">{formatDate(schedule.date_time)}</p>
					</div>
					<div>
						<h4 className="text-2xl">Venue</h4>
						<p className="text-2xl font-bold">{schedule.venue}</p>
					</div>
					<div>
						<h4 className="text-2xl">Course</h4>
						<p className="text-2xl font-bold">{schedule.course}</p>
					</div>
					<div>
						<h4 className="text-2xl">Examination Officer</h4>
						<p className="text-2xl font-bold">
							{schedule.exam_officer.exam_officer.full_name}
						</p>
					</div>
					<div>
						<h4 className="text-2xl">Supervisors</h4>
						<div className="">
							{schedule.supervisors.map((supervisor) => (
								<p key={supervisor.id} className="text-2xl font-bold">
									{supervisor.supervisor.full_name}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Schedule
