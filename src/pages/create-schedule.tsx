import { useMutation, useQueries } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { X } from "@phosphor-icons/react"
import { useFormik } from "formik"
import { toast } from "sonner"
import React from "react"

import { CourseProps, ExamOfficerProps, SupervisorProps } from "types"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Spinner } from "components"
import { queryClient } from "main"
import { instance } from "lib"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "components/ui/select"

import { VenueList, endpoints } from "config"

type SchedulePayload = {
	course: string
	date_time: string
	venue: string
	supervisors: string[]
	exam_officer: string
}

const initialValues: SchedulePayload = {
	course: "",
	date_time: "",
	venue: "",
	supervisors: [],
	exam_officer: "",
}

const CreateSchedule = () => {
	const navigate = useNavigate()

	const today = new Date().toISOString()

	const [
		{ data: examOfficerQuery },
		{ data: supervisorQuery },
		{ data: coursesQuery },
	] = useQueries({
		queries: [
			{
				queryFn: () => instance.get(`${endpoints().exam_officers.all}`),
				queryKey: ["get-exam-officers"],
			},
			{
				queryFn: () => instance.get(`${endpoints().supervisors.all}`),
				queryKey: ["get-supervisors"],
			},
			{
				queryFn: () =>
					instance.get(endpoints().courses.all).then((res) => res.data),
				queryKey: ["get-courses"],
			},
		],
	})

	const { isPending } = useMutation({
		mutationFn: (payload: SchedulePayload) =>
			instance.post(`${endpoints().exam_schedules.create}`, payload),
		mutationKey: ["create-schedule"],
		onSuccess: ({ data }) => {
			console.log(data)
			queryClient.invalidateQueries({ queryKey: ["get-exam_schedules"] })
			navigate("/dashboard/schedules")
		},
		onError: (error) => console.log(error),
	})

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	const hasValue = (id: string) =>
		values.supervisors.find((supervisor) => supervisor === id)

	const addSupervisor = (id: string) => {
		if (hasValue(id)) return toast.error("Supervisor added already!")
		setFieldValue("supervisors", [...values.supervisors, id])
	}

	const removeSupervisor = (id: string) => {
		if (!hasValue) return
		setFieldValue(
			"supervisors",
			values.supervisors.filter((supervisor) => supervisor !== id)
		)
	}

	const [examOfficers, setExamOfficers] = React.useState<ExamOfficerProps[]>([])
	const [supervisors, setSupervisors] = React.useState<SupervisorProps[]>([])
	const [courses, setCourses] = React.useState<CourseProps[]>([])
	React.useEffect(() => {
		if (examOfficerQuery) {
			setExamOfficers(examOfficerQuery.data)
		}
	}, [examOfficerQuery])
	React.useEffect(() => {
		if (supervisorQuery) {
			setSupervisors(supervisorQuery.data)
		}
	}, [supervisorQuery])
	React.useEffect(() => {
		if (coursesQuery) {
			setCourses(coursesQuery.data)
		}
	}, [coursesQuery])

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">New Schedule</p>
				<Button onClick={() => navigate(-1)}>Back</Button>
			</div>
			<div className="h-[90dvh] w-full">
				<form
					onSubmit={handleSubmit}
					className="flex w-full max-w-[400px] flex-col gap-5">
					<div className="w-full">
						<Label htmlFor="course">Course</Label>
						<Select onValueChange={(value) => setFieldValue("course", value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select course" />
							</SelectTrigger>
							<SelectContent>
								{courses.map((course) => (
									<SelectItem key={course.id} value={course.id}>
										{course.course_name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="w-full">
						<Label htmlFor="date_time">Date</Label>
						<Input
							type="datetime-local"
							name="date_time"
							onChange={handleChange}
							min={today}
						/>
					</div>
					<div className="w-full">
						<Label htmlFor="">Venue</Label>
						<Select onValueChange={(value) => setFieldValue("venue", value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select venue" />
							</SelectTrigger>
							<SelectContent>
								{VenueList.map(({ venue, rooms }) =>
									rooms.map((room, index) => (
										<SelectItem key={index} value={`${venue} ${room}`}>
											{venue} {room}
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
					</div>
					<div className="w-full">
						<Label htmlFor="">Supervisors</Label>
						<div className="my-2 flex flex-wrap items-center gap-2">
							{values.supervisors.map((supervisor) => (
								<div
									key={supervisor}
									className="flex items-center gap-2 rounded-3xl bg-gray-400 px-3 py-2">
									<span>{supervisor}</span>
									<button onClick={() => removeSupervisor(supervisor)}>
										<X size={14} />
									</button>
								</div>
							))}
						</div>
						<Select onValueChange={(value) => addSupervisor(value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select supervisor" />
							</SelectTrigger>
							<SelectContent>
								{supervisors.map((supervisor) => (
									<SelectItem key={supervisor.id} value={supervisor.id}>
										{supervisor.supervisor.full_name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="w-full">
						<Label htmlFor="">Exam Officers</Label>
						<Select onValueChange={(value) => setFieldValue("exam_officer", value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select exam officer" />
							</SelectTrigger>
							<SelectContent>
								{examOfficers.map((examOfficer) => (
									<SelectItem key={examOfficer.id} value={examOfficer.id}>
										{examOfficer.exam_officer.full_name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<Button type="submit">{isPending ? <Spinner /> : "Save Schedule"}</Button>
				</form>
			</div>
		</div>
	)
}

export default CreateSchedule
