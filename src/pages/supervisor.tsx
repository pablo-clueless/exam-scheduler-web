import { useParams } from "react-router-dom"

const Supervisor = () => {
	const { id } = useParams()

	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Supervisor {id}</p>
			</div>
			<div className="h-[90dvh] w-full"></div>
		</div>
	)
}

export default Supervisor
