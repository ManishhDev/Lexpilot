import { LayoutDashboard, BarChart3, Settings, HelpCircle } from "lucide-react";
import "../styles/globals.css";
import Link from "next/link";

export const metadata = {
	title: "LegalEase Dashboard",
	description: "Compliance dashboard",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="flex h-screen overflow-hidden antialiased bg-background">
				<aside className="w-64 flex-shrink-0 border-r border-border flex flex-col justify-between">
					<div>
						<div className="p-6">
							<h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
								NotiClear
							</h1>
						</div>

						<nav className="px-3 space-y-1">
							<Link
								href="/dashboard"
								className="flex items-center gap-3 px-3 py-2.5 bg-card text-white rounded-lg"
							>
								<LayoutDashboard className="w-5 h-5 text-blue-400" />
								<span className="font-medium text-sm">Dashboard</span>
							</Link>
							<Link
								href="/analyzer"
								className="flex items-center gap-3 px-3 py-2.5 text-muted hover:text-white hover:bg-card-hover rounded-lg transition-colors"
							>
								<BarChart3 className="w-5 h-5" />
								<span className="font-medium text-sm">Analyzer</span>
							</Link>
						</nav>
					</div>

					<div className="p-4 space-y-4">
						<div className="space-y-1">
							<button className="w-full flex items-center gap-3 px-3 py-2 text-muted hover:text-white hover:bg-card-hover rounded-lg transition-colors">
								<Settings className="w-5 h-5" />
								<span className="font-medium text-sm">Settings</span>
							</button>
							<button className="w-full flex items-center gap-3 px-3 py-2 text-muted hover:text-white hover:bg-card-hover rounded-lg transition-colors">
								<HelpCircle className="w-5 h-5" />
								<span className="font-medium text-sm">Support</span>
							</button>
						</div>

						<div className="pt-4 border-t border-border">
							<p className="text-xs text-muted font-semibold mb-2 px-3 uppercase tracking-wider">
								Account
							</p>
							<div className="flex items-center gap-3 px-3 py-2 bg-card rounded-lg">
								<div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden">
									<div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500"></div>
								</div>
								<div>
									<p className="text-sm font-medium text-white">Premium Workspace</p>
									<p className="text-xs text-muted">Upgrade Plan</p>
								</div>
							</div>
						</div>
					</div>
				</aside>

				<main className="flex-1 bg-surface overflow-y-auto">{children}</main>
			</body>
		</html>
	);
}
