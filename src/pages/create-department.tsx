import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { toast } from "sonner"
import React from "react"

import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { HttpError } from "types/http"
import { FacultyProps } from "types"
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

type Payload = { department_name: string[]; faculty: string }
const initialValues: Payload = { department_name: [], faculty: "" }

const CreateDepartment = () => {
	const navigate = useNavigate()

	const { data } = useQuery({
		queryFn: () =>
			instance.get(endpoints().faculties.all).then((res) => res.data),
		queryKey: ["get-.faculties"],
	})
	const [faculties, setFaculties] = React.useState<FacultyProps[]>([])
	React.useEffect(() => {
		if (data) {
			setFaculties(data)
		}
	}, [data])

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: Payload) =>
			instance.post(`${endpoints().departments.create}`, payload),
		mutationKey: ["create-department"],
		onSuccess: ({ data }) => console.log(data),
		onError: ({ response }: HttpError) => {
			const { detail } = response.data
			toast.error(detail)
		},
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
				const payload: Payload = {
					department_name: [...values.department_name],
					faculty: values.faculty,
				}
				mutateAsync(payload)
			}
		},
	})

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">New Department</p>
				<Button onClick={() => navigate(-1)}>Back</Button>
			</div>
			<div className="h-[90dvh] w-full">
				<form
					onSubmit={handleSubmit}
					className="flex w-full max-w-[400px] flex-col gap-5">
					<div className="w-full">
						<Label htmlFor="department_name">Department Name</Label>
						<Input type="text" name="department_name" onChange={handleChange} />
					</div>
					<div className="w-full">
						<Label htmlFor="faculty">Faculty</Label>
						<Select onValueChange={(value) => setFieldValue("faculty", value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select a faculty" />
							</SelectTrigger>
							<SelectContent>
								{faculties
									.sort((a, b) => a.faculty_name.localeCompare(b.faculty_name))
									.map((faculty) => (
										<SelectItem key={faculty.id} value={`${faculty.id}`}>
											{faculty.faculty_name}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
					<Button type="submit">
						{isPending ? <Spinner /> : "Save Department"}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default CreateDepartment
