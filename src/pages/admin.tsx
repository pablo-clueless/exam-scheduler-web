import { useLocation, useNavigate } from "react-router-dom"
import React from "react"

import { Button } from "components/ui/button"
import { ExamOfficerProps } from "types"
import { formatDate } from "lib"

const Admin = () => {
	const [examOfficer, setExamOfficer] = React.useState<ExamOfficerProps>()
	const { state } = useLocation()
	const navigate = useNavigate()

	React.useEffect(() => {
		setExamOfficer(state)
	}, [state])

	if (!examOfficer) return null

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">
					Examination Officer {examOfficer.employee_id}
					<Button size="sm" onClick={() => navigate(-1)}>
						Back
					</Button>
				</p>
			</div>
			<div className="h-[90dvh] w-full">
				<div className="flex w-full flex-col gap-4">
					<div>
						<h4 className="text-2xl">Name</h4>
						<p className="text-2xl font-bold">{examOfficer.exam_officer.full_name}</p>
					</div>
					<div>
						<h4 className="text-2xl">Email</h4>
						<p className="text-2xl font-bold">{examOfficer.exam_officer.email}</p>
					</div>
					<div>
						<h4 className="text-2xl">Employee ID</h4>
						<p className="text-2xl font-bold">{examOfficer.employee_id}</p>
					</div>
					<div>
						<h4 className="text-2xl">Job Title</h4>
						<p className="text-2xl font-bold">{examOfficer.job_title}</p>
					</div>
					<div>
						<h4 className="text-2xl">Date Added</h4>
						<p className="text-2xl font-bold">
							{formatDate(examOfficer.exam_officer.created_at).split(",")[0]}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Admin
