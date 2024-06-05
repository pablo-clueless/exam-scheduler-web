import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { toast } from "sonner"
import React from "react"

import { HttpError } from "types/http"
import { Button } from "./ui/button"
import { CourseProps } from "types"
import { Spinner } from "./spinner"
import { Label } from "./ui/label"
import { endpoints } from "config"
import { instance } from "lib"
import { store } from "store"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"

const initialValues = {
	course: "",
}

export const RegisterCourse = () => {
	const [courses, setCourses] = React.useState<CourseProps[]>([])
	const { user } = store()

	const { data } = useQuery({
		queryFn: () =>
			instance
				.get(endpoints(String(user?.id)).courses.all)
				.then((res) => res.data),
		queryKey: ["get-courses"],
	})
	React.useEffect(() => {
		if (data) {
			setCourses(data)
		}
	}, [data])

	const { isPending } = useMutation({
		mutationFn: (payload: typeof initialValues) =>
			instance.post(endpoints().students.register_course, payload),
		mutationKey: ["register-course"],
		onSuccess: ({ data }) => {
			console.log(data)
		},
		onError: ({ response }: HttpError) => {
			const { detail } = response.data
			toast.error(detail)
		},
	})

	const { handleSubmit, setFieldValue } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return (
		<div className="w-full p-4">
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
				<div>
					<Label htmlFor="course">Course</Label>
					<Select onValueChange={(value) => setFieldValue("course", value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select a course" />
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
				<Button type="submit">{isPending ? <Spinner /> : "Register Course"}</Button>
			</form>
		</div>
	)
}
