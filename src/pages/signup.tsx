import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { toast } from "sonner"

import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { instance, sanitize } from "lib"
import { HttpError } from "types/http"
import { Spinner } from "components"
import { endpoints } from "config"
import { SignUp } from "assets"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "components/ui/select"

const initialValues = {
	full_name: "",
	email: "",
	role: "",
	password: "",
}

type Key = keyof typeof initialValues

const Roles = ["student", "supervisor", "exam_officer"]

const Signup = () => {
	const navigate = useNavigate()

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: typeof initialValues) =>
			instance.post(`${endpoints().auth.register}`, payload),
		mutationKey: ["login"],
		onSuccess: ({ data }) => {
			const { message } = data
			toast.success(message)
			navigate("/")
		},
		onError: ({ response }: HttpError) => {
			const { error } = response.data
			toast.error(error)
		},
	})

	const { handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues,
		onSubmit: (values) => {
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
		<main className="h-screen w-full">
			<div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
				<div className="flex h-full w-full flex-col items-center justify-center">
					<h1 className="mb-14 text-4xl font-bold">Exam Management System</h1>
					<h3 className="text-2xl font-semibold">Create Your Account</h3>
					<form
						onSubmit={handleSubmit}
						className="my-10 flex w-full max-w-[400px] flex-col gap-5">
						<div className="w-full">
							<Label htmlFor="full_name">Full Name</Label>
							<Input
								type="text"
								name="full_name"
								placeholder="Full Name"
								onChange={handleChange}
							/>
						</div>
						<div className="w-full">
							<Label htmlFor="email">Email</Label>
							<Input
								type="email"
								name="email"
								placeholder="Email"
								onChange={handleChange}
							/>
						</div>
						<div className="w-full">
							<Label htmlFor="role">Role</Label>
							<Select onValueChange={(value) => setFieldValue("role", value)}>
								<SelectTrigger>
									<SelectValue className="capitalize" placeholder="Select Role" />
								</SelectTrigger>
								<SelectContent>
									{Roles.map((role) => (
										<SelectItem key={role} value={role} className="capitalize">
											{sanitize(role)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="w-full">
							<Label htmlFor="password">Password</Label>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
							/>
						</div>
						<Button type="submit">{isPending ? <Spinner /> : "Proceed"}</Button>
					</form>
					<p className="flex items-center gap-1 text-sm">
						Already have an account?{" "}
						<Link to="/" className="link text-sm">
							Log In
						</Link>
					</p>
				</div>
				<div className="grid h-full w-full place-items-center p-10">
					<div className="h-full w-full rounded-2xl bg-black/50">
						<img src={SignUp} alt="" className="h-full w-full rounded-2xl" />
					</div>
				</div>
			</div>
		</main>
	)
}

export default Signup
