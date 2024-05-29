export const sanitize = (value: string) =>
	value.toLowerCase().split("_").join(" ")
