export type UserProps = {
	email: string
	full_name: string
	id: string
	role: "student" | "supervisor" | "admin"
}

export type StudentProps = {
	id: string
	student_reg_number: string
	student: string
	department: number
	matriculated: boolean
	year: number
}

export type ExamOfficerProps = {
	department: number
	employee_id: string
	id: string
	job_title: string
	exam_officer: string
}

export type SupervisorProps = {
	department: number
	employee_id: string
	id: string
	job_title: string
	supervisor: string
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
