import {
	FileText,
	Building2,
	ClipboardList,
	Wallet,
	MoreVertical,
} from "lucide-react";
import CalendarCard from "../../components/CalendarCard";

export default function Dashboard() {
	return (
		<div className="p-8 max-w-[1400px] mx-auto">
			<div className="flex justify-between items-end mb-8 gap-4 flex-wrap">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Compliance Overview</h1>
					<p className="text-muted text-sm">
						Monitor your regulatory health and upcoming filing deadlines in real-time.
					</p>
				</div>
				<div className="flex gap-3">
					<button className="px-4 py-2 text-sm font-medium text-white bg-card border border-border rounded-lg hover:bg-card-hover transition-colors">
						Export Report
					</button>
					<button className="px-4 py-2 text-sm font-medium text-black bg-primary rounded-lg hover:bg-blue-200 transition-colors">
						+ Add New Entity
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				<CalendarCard
					icon={FileText}
					iconBgColor="bg-blue-600/20 text-blue-500"
					title="GSTR-3B"
					description="Summary of outward supplies and input tax credit."
					badge="MONTHLY"
					date="Oct 20, 2024"
				/>
				<CalendarCard
					icon={Wallet}
					iconBgColor="bg-orange-500/20 text-orange-500"
					title="TDS Deposit"
					description="Monthly deposit of tax deducted at source."
					badge="MONTHLY"
					date="Nov 07, 2024"
				/>
				<CalendarCard
					icon={Building2}
					iconBgColor="bg-blue-600/20 text-blue-500"
					title="MCA Form AOC-4"
					description="Filing financial statements with the Registrar."
					badge="ANNUAL"
					date="Oct 29, 2024"
				/>

				<CalendarCard
					icon={ClipboardList}
					iconBgColor="bg-blue-600/20 text-blue-500"
					title="PF Return"
					description="Provident Fund contribution filing for employees."
					badge="MONTHLY"
					date="Oct 15, 2024"
				/>

				<div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 flex justify-between items-center relative overflow-hidden gap-6">
					<div className="absolute right-0 top-0 w-64 h-full bg-blue-600/10 blur-3xl rounded-full translate-x-1/2"></div>

					<div className="relative z-10">
						<h3 className="text-2xl font-bold text-white mb-2">Compliance Score: 98%</h3>
						<p className="text-sm text-muted mb-6">
							Your organization is currently in excellent health. All major tax filings
							for Q3 have been successfully reconciled.
						</p>
						<div className="flex gap-3">
							<span className="text-xs font-medium text-white bg-white/10 px-3 py-1.5 rounded border border-white/5">
								12 Filings Done
							</span>
							<span className="text-xs font-medium text-white bg-white/10 px-3 py-1.5 rounded border border-white/5">
								1 Upcoming
							</span>
						</div>
					</div>

					<div className="relative z-10 flex items-end gap-2 h-20 pr-4">
						<div className="w-5 bg-white/20 rounded-t-sm h-1/3"></div>
						<div className="w-5 bg-white/40 rounded-t-sm h-1/2"></div>
						<div className="w-5 bg-white/60 rounded-t-sm h-3/4"></div>
						<div className="w-5 bg-primary rounded-t-sm h-full shadow-[0_0_15px_rgba(214,228,255,0.4)]"></div>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-lg font-bold text-white mb-4">Recent Actions</h2>
				<div className="space-y-3">
					<div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:bg-card-hover transition-colors">
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 rounded-full bg-blue-400 mt-1"></div>
							<div>
								<h4 className="text-sm font-semibold text-white">GSTR-1 Filed Successfully</h4>
								<p className="text-xs text-muted mt-0.5">
									2 hours ago • Reference #GST88321
								</p>
							</div>
						</div>
						<div className="flex items-center gap-6">
							<span className="text-xs text-muted hidden sm:block">
								Processed by AI Analyzer
							</span>
							<button className="text-muted hover:text-white">
								<MoreVertical className="w-5 h-5" />
							</button>
						</div>
					</div>

					<div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:bg-card-hover transition-colors">
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 rounded-full bg-orange-400 mt-1"></div>
							<div>
								<h4 className="text-sm font-semibold text-white">
									Income Tax Notice Detected
								</h4>
								<p className="text-xs text-muted mt-0.5">Yesterday • Analysis required</p>
							</div>
						</div>
						<div className="flex items-center gap-6">
							<span className="text-xs text-muted hidden sm:block">Action Needed</span>
							<button className="text-muted hover:text-white">
								<MoreVertical className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
