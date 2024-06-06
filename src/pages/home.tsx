import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { toast } from "sonner"
import axios from "axios"

import { Checkbox } from "components/ui/checkbox"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { HttpError } from "types/http"
import { Spinner } from "components"
import { endpoints } from "config"
import { Login } from "assets"
import { store } from "store"

const initialValues = { email: "", password: "" }

type Key = keyof typeof initialValues

const Home = () => {
	const navigate = useNavigate()
	const { signIn } = store()

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: typeof initialValues) =>
			axios.post(`${endpoints().auth.login}`, payload),
		mutationKey: ["login"],
		onSuccess: ({ data }) => {
			const { token, user } = data
			signIn(user, token)
			toast.success("User logged in!")
			navigate("/dashboard")
		},
		onError: ({ response }: HttpError) => {
			const { detail } = response.data
			toast.error(detail)
		},
	})

	const { handleChange, handleSubmit } = useFormik({
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
					<h3 className="text-2xl font-semibold">Welcome Back</h3>
					<p>Please enter your login credentials</p>
					<form
						onSubmit={handleSubmit}
						className="my-10 flex w-full max-w-[400px] flex-col gap-5">
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
							<Label htmlFor="password">Password</Label>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
							/>
						</div>
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center gap-1">
								<Checkbox />
								<Label htmlFor="remember" className="text-sm">
									Remember me
								</Label>
							</div>
							<Link to="/forgot-password" className="link text-sm">
								Forgot Password
							</Link>
						</div>
						<Button type="submit">{isPending ? <Spinner /> : "Proceed"}</Button>
					</form>
					<p className="flex items-center gap-1 text-sm">
						Don't have an account?{" "}
						<Link to="/signup" className="link text-sm">
							Create account
						</Link>
					</p>
				</div>
				<div className="grid h-full w-full place-items-center p-10">
					<div className="h-full w-full rounded-2xl bg-black/50">
						<img src={Login} alt="" className="h-full w-full rounded-2xl" />
					</div>
				</div>
			</div>
		</main>
	)
}

export default Home
