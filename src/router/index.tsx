import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"

import DashboardLayout from "layouts/dashboard-layout"
import AuthRoute from "./AuthRoute"
import {
	Admins,
	Course,
	Courses,
	CreateCourse,
	CreateDepartment,
	CreateSchedule,
	Dashboard,
	Department,
	Departments,
	ForgotPassword,
	Home,
	Schedule,
	Schedules,
	Signup,
	Student,
	Students,
	Supervisor,
	Supervisors,
	User,
	Verify,
} from "pages"

const Router = () => {
	return (
		<Suspense>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/verify" element={<Verify />} />
				<Route element={<AuthRoute />}>
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="courses" element={<Courses />} />
						<Route path="courses/:id" element={<Course />} />
						<Route path="courses/create" element={<CreateCourse />} />
						<Route path="departments" element={<Departments />} />
						<Route path="departments/create" element={<CreateDepartment />} />
						<Route path="departments/:id" element={<Department />} />
						<Route path="schedules" element={<Schedules />} />
						<Route path="schedules/:id" element={<Schedule />} />
						<Route path="schedules/create" element={<CreateSchedule />} />
						<Route path="supervisors" element={<Supervisors />} />
						<Route path="supervisors/:id" element={<Supervisor />} />
						<Route path="students" element={<Students />} />
						<Route path="students/:id" element={<Student />} />
						<Route path="admins" element={<Admins />} />
						<Route path="user" element={<User />} />
					</Route>
				</Route>
			</Routes>
		</Suspense>
	)
}

export default Router
