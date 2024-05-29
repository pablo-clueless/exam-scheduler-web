import { CaretLeft, CaretRight } from "@phosphor-icons/react"

interface Props {
	current: number
	onPageChange: (value: number) => void
	pageSize: number
	total: number
}

const Pagination = ({ current, onPageChange, pageSize, total }: Props) => {
	const totalPages = Math.ceil(total / pageSize)

	const previousPage = () => {
		if (current > 1) {
			onPageChange(current - 1)
		}
	}

	const nextPage = () => {
		if (current < totalPages) {
			onPageChange(current + 1)
		}
	}

	const renderButton = () => {
		const numbers = []
		for (let index = 1; index <= totalPages; index++) {
			numbers.push(
				<button
					key={index}
					onClick={() => onPageChange(index)}
					className={`grid size-8 place-items-center rounded-full text-sm ${current === index ? "bg-black text-white" : ""}`}>
					{index}
				</button>
			)
		}
		return numbers
	}

	return (
		<div className="flex w-full items-center justify-center gap-6">
			<button
				onClick={previousPage}
				className="grid size-8 place-items-center rounded-full bg-black text-white hover:bg-black/80 disabled:bg-gray-500"
				disabled={current === 1}>
				<CaretLeft />
			</button>
			<div className="flex items-center gap-4">{renderButton()}</div>
			<button
				onClick={nextPage}
				className="grid size-8 place-items-center rounded-full bg-black text-white hover:bg-black/80 disabled:bg-gray-500"
				disabled={current === totalPages}>
				<CaretRight />
			</button>
		</div>
	)
}

export default Pagination
