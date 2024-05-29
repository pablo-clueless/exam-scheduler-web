import React from "react"

export const Dashboard = React.lazy(() => import("./dashboard"))

export const Admins = React.lazy(() => import("./admins"))

export const Course = React.lazy(() => import("./course"))
export const Courses = React.lazy(() => import("./courses"))
export const CreateCourse = React.lazy(() => import("./create-course"))

export const Department = React.lazy(() => import("./department"))
export const Departments = React.lazy(() => import("./departments"))
export const CreateDepartment = React.lazy(() => import("./create-department"))

export const Home = React.lazy(() => import("./home"))
export const Signup = React.lazy(() => import("./signup"))
export const ForgotPassword = React.lazy(() => import("./forgot-password"))
export const Verify = React.lazy(() => import("./verify"))

export const Schedules = React.lazy(() => import("./schedules"))
export const Schedule = React.lazy(() => import("./schedule"))
export const CreateSchedule = React.lazy(() => import("./create-schedule"))

export const Supervisor = React.lazy(() => import("./supervisor"))
export const Supervisors = React.lazy(() => import("./supervisors"))

export const Student = React.lazy(() => import("./student"))
export const Students = React.lazy(() => import("./students"))

export const User = React.lazy(() => import("./user"))
