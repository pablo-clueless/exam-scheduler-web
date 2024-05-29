import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "components/ui/table"

const Admins = () => {
	return (
		<div className="flex h-full w-full flex-col gap-10 p-5">
			<div className="flex w-full items-center justify-between">
				<p className="text-xl font-bold">Admins</p>
			</div>
			<div className="h-[90dvh] w-full ">
				<Table>
					<TableHeader>
						<TableRow></TableRow>
					</TableHeader>
					<TableBody></TableBody>
				</Table>
			</div>
		</div>
	)
}

export default Admins