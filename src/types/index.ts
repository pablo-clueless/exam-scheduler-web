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
	department: null
	employee_id: string
	exam: null
	exam_officer_name: string
	id: string
	job_title: string
}

export type SupervisorProps = {
	department: null
	employee_id: string
	exam: null
	id: string
	job_title: string
	supervisor_name: string
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
