import { Eye, EyeOff } from "lucide-react"
import * as React from "react"

import { cn } from "lib/utils"

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

		return (
			<div className="flex h-10 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 focus-within:border-black">
				<input
					type={isPasswordVisible ? "text" : type}
					className={cn(
						"flex h-full w-full border-none bg-background px-3 py-2 text-sm outline-none transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				{type === "password" && (
					<button
						type="button"
						onClick={() => setIsPasswordVisible((prev) => !prev)}>
						{isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				)}
			</div>
		)
	}
)
Input.displayName = "Input"

export { Input }
