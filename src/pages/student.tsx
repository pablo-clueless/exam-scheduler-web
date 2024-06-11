import { useLocation, useNavigate } from "react-router-dom"
import React from "react"

import { Button } from "components/ui/button"
import { StudentProps } from "types"
import { formatDate } from "lib"

const Student = () => {
	const [student, setStudent] = React.useState<StudentProps>()
	const { state } = useLocation()
	const naivgate = useNavigate()

	React.useEffect(() => {
		setStudent(state)
	}, [state])

	if (!student) return null

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Student</p>
				<Button size="sm" onClick={() => naivgate(-1)}>
					Back
				</Button>
			</div>
			<div className="h-[90dvh] w-full">
				<div className="flex w-full flex-col gap-4">
					<div>
						<h4 className="text-2xl">Name</h4>
						<p className="text-2xl font-bold">{student.student.full_name}</p>
					</div>
					<div>
						<h4 className="text-2xl">Email</h4>
						<p className="text-2xl font-bold">{student.student.email}</p>
					</div>
					<div>
						<h4 className="text-2xl">Matric Number</h4>
						<p className="text-2xl font-bold">{student.student_reg_number}</p>
					</div>
					<div>
						<h4 className="text-2xl">Department</h4>
						<p className="text-2xl font-bold">{student.department}</p>
					</div>
					<div>
						<h4 className="text-2xl">Date Added</h4>
						<p className="text-2xl font-bold">
							{formatDate(student.student.created_at).split(",")[0]}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Student
