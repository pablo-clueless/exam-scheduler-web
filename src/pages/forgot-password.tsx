import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"

import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Forgot } from "assets"

const initialValues = { email: "" }

const ForgotPassword = () => {
	const navigate = useNavigate()

	const { handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
			navigate("/")
		},
	})

	return (
		<main className="h-screen w-full">
			<div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
				<div className="flex h-full w-full flex-col items-center justify-center">
					<h1 className="mb-14 text-4xl font-bold">Exam Scheduler</h1>
					<h3 className="text-2xl font-semibold">Forgot Password</h3>
					<form
						onSubmit={handleSubmit}
						className="my-10 flex w-full max-w-[400px] flex-col gap-5">
						<Input
							type="email"
							name="email"
							placeholder="Email"
							onChange={handleChange}
						/>
						<Button type="submit">Proceed</Button>
					</form>
					<p className="flex items-center gap-1 text-sm">
						Already have an account?{" "}
						<Link to="/" className="link text-sm">
							Log In
						</Link>
					</p>
				</div>
				<div className="p-10, useNav grid h-full w-full place-items-center bg-black/50">
					<img src={Forgot} alt="" className="aspect-square w-full" />
				</div>
			</div>
		</main>
	)
}

export default ForgotPassword
