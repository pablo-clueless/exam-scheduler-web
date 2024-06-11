import { useLocation, useNavigate } from "react-router-dom"
import React from "react"

import { Button } from "components/ui/button"
import { SupervisorProps } from "types"
import { formatDate } from "lib"

const Supervisor = () => {
	const [supervisor, setSupervisor] = React.useState<SupervisorProps>()
	const { state } = useLocation()
	const navigate = useNavigate()

	React.useEffect(() => {
		setSupervisor(state)
	}, [state])

	if (!supervisor) return null

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Supervisor {supervisor.employee_id}</p>
				<Button size="sm" onClick={() => navigate(-1)}>
					Back
				</Button>
			</div>
			<div className="h-[90dvh] w-full">
				<div className="flex w-full flex-col gap-4">
					<div>
						<h4 className="text-2xl">Name</h4>
						<p className="text-2xl font-bold">{supervisor.supervisor.full_name}</p>
					</div>
					<div>
						<h4 className="text-2xl">Email</h4>
						<p className="text-2xl font-bold">{supervisor.supervisor.email}</p>
					</div>
					<div>
						<h4 className="text-2xl">Employee ID</h4>
						<p className="text-2xl font-bold">{supervisor.employee_id}</p>
					</div>
					<div>
						<h4 className="text-2xl">Job Title</h4>
						<p className="text-2xl font-bold">{supervisor.job_title}</p>
					</div>
					<div>
						<h4 className="text-2xl">Date Added</h4>
						<p className="text-2xl font-bold">
							{formatDate(supervisor.supervisor.created_at).split(",")[0]}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Supervisor
