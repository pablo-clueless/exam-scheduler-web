import {
	Book,
	Calendar,
	FacebookLogo,
	GridFour,
	IdentificationBadge,
	LinkedinLogo,
	Student,
	TwitterLogo,
	User,
	UsersFour,
} from "@phosphor-icons/react"

export const SidebarLinks = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: GridFour,
	},
	{
		name: "Departments",
		href: "/dashboard/departments",
		icon: UsersFour,
	},
	{
		name: "Courses",
		href: "/dashboard/courses",
		icon: Book,
	},
	{
		name: "Schedules",
		href: "/dashboard/schedules",
		icon: Calendar,
	},
	{
		name: "Supervisors",
		href: "/dashboard/supervisors",
		icon: IdentificationBadge,
	},
	{
		name: "Students",
		href: "/dashboard/students",
		icon: Student,
	},
	{
		name: "Admins",
		href: "/dashboard/admins",
		icon: User,
	},
]

export const SocialMediaLinks = [
	{
		name: "twitter",
		href: "https://twitter.com/",
		icon: TwitterLogo,
	},
	{
		name: "linkedin",
		href: "https://www.linkedin.com/",
		icon: LinkedinLogo,
	},
	{
		name: "facebook",
		href: "https://www.facebook.com/",
		icon: FacebookLogo,
	},
]

export const FooterLinks = [
	{
		lael: "",
		links: [
			{
				name: "",
				href: "",
			},
		],
	},
]
