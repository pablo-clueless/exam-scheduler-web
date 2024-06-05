export const sanitize = (value: string) =>
	value.toLowerCase().split("_").join(" ")

export const getInitials = (value: string) =>
	value
		.split(" ")
		.map((word) => word.substring(0, 1))
		.join("")
