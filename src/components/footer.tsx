import { SocialMediaLinks } from "config/links"

export const Footer = () => {
	return (
		<footer className="flex w-full items-center justify-center bg-black px-6 py-3 text-white">
			<div className="flex w-full max-w-[1220px] flex-col">
				<div className="w-full"></div>
				<div className="flex w-full items-center justify-between text-sm">
					<p>Copyright&copy;{new Date().getFullYear()}. YCT '21</p>
					<div className="flex items-center gap-2">
						{SocialMediaLinks.map((link) => (
							<a key={link.name} href={link.href} target="_blank" className="">
								<link.icon size={18} />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
