import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { toast } from "sonner"
import React from "react"

import { Textarea } from "components/ui/textarea"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Spinner } from "components"
import { endpoints } from "config"
import { instance } from "lib"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "components/ui/select"
import { DepartmentProps } from "types"

const initialValues = {
	course_name: "",
	course_code: "",
	description: "",
	department: "",
}

const CreateCourse = () => {
	const navigate = useNavigate()

	const { data } = useQuery({
		queryFn: () =>
			instance.get(endpoints().departments.all).then((res) => res.data),
		queryKey: ["get-departments"],
	})
	const [departments, setDepartments] = React.useState<DepartmentProps[]>([])
	React.useEffect(() => {
		if (data) {
			setDepartments(data)
		}
	}, [data])

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: typeof initialValues) =>
			instance.post(`${endpoints().courses.create}`, payload),
		mutationKey: ["create-course"],
		onSuccess: ({ data }) => console.log(data),
		onError: (error) => console.log(error),
	})

	const { handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues,
		onSubmit: (values) => {
			type Key = keyof typeof values
			let hasEmptyValues = false
			Object.keys(values).forEach((key) => {
				if (!values[key as Key]) {
					toast.error(`Please fill the ${key} field!`)
					hasEmptyValues = true
				}
			})
			if (!hasEmptyValues) {
				mutateAsync(values)
			}
		},
	})

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">New Course</p>
				<Button onClick={() => navigate(-1)}>Back</Button>
			</div>
			<div className="h-[90dvh] w-full">
				<form
					onSubmit={handleSubmit}
					className="flex  w-full max-w-[400px] flex-col gap-5">
					<div className="w-full">
						<Label htmlFor="course_name">Course Name</Label>
						<Input type="text" name="course_name" onChange={handleChange} />
					</div>
					<div className="w-full">
						<Label htmlFor="course_name">Course Code</Label>
						<Input type="text" name="course_code" onChange={handleChange} />
					</div>
					<div className="w-full">
						<Label htmlFor="department">Department</Label>
						<Select onValueChange={(value) => setFieldValue("department", value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select a department" />
							</SelectTrigger>
							<SelectContent>
								{departments
									.sort((a, b) => a.department_name.localeCompare(b.department_name))
									.map((department) => (
										<SelectItem key={department.id} value={`${department.id}`}>
											{department.department_name}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
					<div className="w-full">
						<Label htmlFor="description">Description</Label>
						<Textarea name="description" onChange={handleChange} />
					</div>
					<Button type="submit">{isPending ? <Spinner /> : "Save Course"}</Button>
				</form>
			</div>
		</div>
	)
}

export default CreateCourse
