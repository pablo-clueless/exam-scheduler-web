export const formatDate = (date: string | Date) => {
	return new Intl.DateTimeFormat("en-NG", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(new Date(date))
}
