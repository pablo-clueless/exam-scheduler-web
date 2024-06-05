import { persist } from "zustand/middleware"
import { create } from "zustand"
import Cookies from "js-cookie"

import { UserProps } from "types"

interface Store {
	user: UserProps | null
	isAuthenticated: boolean
	signIn: (user: UserProps, token: string) => void
	signOut: () => void
}

export const store = create<Store>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			signIn: (user: UserProps, token) => {
				Cookies.set("EXAM_AUTH_TOKEN", token, {
					sameSite: "Lax",
					secure: true,
					expires: 100 * 24 * 60 * 60 * 30, // 30 days
				})
				set(() => ({ user, isAuthenticated: true }))
			},
			signOut: async () => {
				try {
					Cookies.set("EXAM_AUTH_TOKEN", "", { expires: 0 })
					set(() => ({ user: null, isAuthenticated: false }))
					window.localStorage.removeItem("exam-store")
					window.location.replace("/")
				} catch (error) {
					console.log(error)
				}
			},
		}),
		{ name: "exam-store" }
	)
)
