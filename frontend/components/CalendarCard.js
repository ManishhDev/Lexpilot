import { ArrowRight } from "lucide-react";

export default function CalendarCard({
	icon: Icon,
	title,
	description,
	badge,
	date,
	iconBgColor,
}) {
	return (
		<div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between h-full hover:border-gray-600 transition-colors">
			<div>
				<div className="flex justify-between items-start mb-4">
					<div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor}`}>
						<Icon className="w-5 h-5 text-white" />
					</div>
					<span className="text-[10px] font-semibold text-muted bg-[#2a2e39] px-2 py-1 rounded tracking-wider">
						{badge}
					</span>
				</div>
				<h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
				<p className="text-muted text-sm line-clamp-2">{description}</p>
			</div>

			<div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
				<div>
					<p className="text-xs text-muted mb-0.5 uppercase tracking-wider">Due Date</p>
					<p className="text-white font-medium text-sm">{date}</p>
				</div>
				<button className="flex items-center gap-1 text-xs font-medium text-white hover:text-blue-400 transition-colors">
					Details <ArrowRight className="w-3 h-3" />
				</button>
			</div>
		</div>
	);
}
