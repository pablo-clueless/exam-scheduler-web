const baseUrl = import.meta.env.VITE_API_URL

export const endpoints = (param?: string) => {
	const auth = {
		register: `${baseUrl}/create_user/`,
		login: `${baseUrl}/login/`,
	}

	const faculties = {
		create: `${baseUrl}/faculties/create/`,
		update: `${baseUrl}/faculties/update/${param}/`,
		all: `${baseUrl}/faculties/`,
	}

	const departments = {
		create: `${baseUrl}/departments/create/`,
		update: `${baseUrl}/departments/update/${param}/`,
		all: `${baseUrl}/departments`,
	}

	const supervisors = {
		update: `${baseUrl}/supervisors/update/${param}/`,
		all: `${baseUrl}/supervisors/`,
		dashboard: `${baseUrl}/supervisor-dashboard/`,
	}

	const exam_officers = {
		update: `${baseUrl}/exam-officers/update/${param}/`,
		all: `${baseUrl}/exam-officers/`,
	}

	const students = {
		update: `${baseUrl}/students/update/${param}/`,
		all: `${baseUrl}/students/`,
		register_course: `${baseUrl}/student/${param}/register-course/`,
		get_registered_courses: `${baseUrl}/student/${param}/registered-courses/`,
		get_exam_schedule: `${baseUrl}/student/${param}/exams/`,
	}

	const exam_schedules = {
		create: `${baseUrl}/exam-schedules/create`,
		update: `${baseUrl}/exam-schedules/update/${param}/`,
		all: `${baseUrl}/exam-schedules/`,
	}

	const courses = {
		create: `${baseUrl}/courses/create`,
		update: `${baseUrl}/courses/update/${param}/`,
		all: `${baseUrl}/courses/`,
		delete_all: `${baseUrl}/courses/delete_all/`,
	}

	const attendance = {
		mark: `${baseUrl}/mark-attendance/`,
		delete_all: `${baseUrl}/delete-attendance/`,
	}

	const exams = {
		materials: `${baseUrl}/exam-materials/`,
		reevaluation: `${baseUrl}/exam-reevaluation-requests/`,
		mark_taken: `${baseUrl}/exam/${param}/mark-taken/`,
	}

	return {
		auth,
		attendance,
		courses,
		departments,
		exams,
		exam_officers,
		exam_schedules,
		faculties,
		students,
		supervisors,
	}
}
