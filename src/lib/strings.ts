export const sanitize = (value: string) =>
	value.toLowerCase().split("_").join(" ")

export const getInitials = (value: string) =>
	value
		.split(" ")
		.map((word) => word.substring(0, 1))
		.join("")

export const generateMatric = (matric: string, index: number) => {
	const truncatedMatric = matric.substring(0, 11)
	const paddedIndex = index.toString().padStart(4, "0")
	const newMatric = truncatedMatric + paddedIndex
	return newMatric
}
