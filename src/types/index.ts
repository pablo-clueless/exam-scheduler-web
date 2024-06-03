export type UserProps = {
	email: string
	full_name: string
	id: string
	role: "student" | "supervisor" | "admin"
	created_at: string
	updated_at: string
}

export type StudentProps = {
	id: string
	student_reg_number: string
	student: UserProps
	department: number
	matriculated: boolean
	year: number
}

export type ExamOfficerProps = {
	department: number
	employee_id: string
	id: string
	job_title: string
	exam_officer: UserProps
}

export type SupervisorProps = {
	department: number
	employee_id: string
	id: string
	job_title: string
	supervisor: UserProps
}

export type CourseProps = {
	id: string
	course_code: string
	course_name: string
	decription: string
	department: number
}

export type ScheduleProps = {
	id: string
	course: string
	date_time: string
	venue: string
	supervisors: string[]
	exam_officer: string
}

export type DepartmentProps = {
	department_name: string
	faculty: number
	id: number
}

export type FacultyProps = {
	faculty_name: string
	id: number
}
