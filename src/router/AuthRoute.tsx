import { Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"

const AuthRoute = () => {
	const token = Cookies.get("EXAM_AUTH_TOKEN")

	return token ? <Outlet /> : <Navigate to="/" />
}

export default AuthRoute
