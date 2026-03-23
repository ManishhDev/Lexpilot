"use client";

import { useState } from "react";
import { FileText, Zap, Calendar, Check, Download, Loader2 } from "lucide-react";
import { analyzeNotice } from "../../services/api";

export default function AnalyzerPage() {
	const [inputText, setInputText] = useState("");
	const [analysis, setAnalysis] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleAnalyze = async () => {
		if (!inputText.trim()) return;

		setLoading(true);
		const data = await analyzeNotice(inputText);

		if (!data.error) {
			setAnalysis(data.result);
		} else {
			alert("Failed to analyze notice. Please try again.");
		}

		setLoading(false);
	};

	return (
		<div className="flex flex-col h-full min-h-screen">
			<div className="flex-1 p-8 max-w-[1200px] mx-auto w-full">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">Notice Analyzer</h1>
					<p className="text-muted text-sm max-w-2xl">
						Paste your official correspondence below. Our AI will translate the legal jargon
						into actionable steps.
					</p>
				</div>

				<div
					className={`bg-card border border-border rounded-2xl max-w-4xl p-2 relative transition-all duration-500 ${analysis ? "mb-12" : "mb-8"}`}
				>
					<div className="px-5 pt-4 pb-3 border-b border-border/50 flex justify-between items-center">
						<div className="flex items-center gap-2">
							<FileText className="w-4 h-4 text-blue-400" />
							<span className="font-semibold text-sm text-white">Document Content</span>
						</div>
						<span className="text-[10px] font-medium text-muted bg-white/5 border border-white/5 px-3 py-1 rounded-full">
							Encrypted &amp; Private
						</span>
					</div>

					<div className="p-4">
						<textarea
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
							className="w-full h-48 sm:h-64 bg-surface border-none rounded-xl p-4 text-white text-sm placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-blue-500/30 resize-none"
							placeholder="Paste the text from your notice here... e.g., 'Notice of deficiency under section 144...'"
						/>
					</div>

					<div className="absolute -bottom-5 right-6 z-10">
						<button
							onClick={handleAnalyze}
							disabled={loading || !inputText}
							className="bg-primary hover:bg-blue-200 text-[#0a0c10] font-semibold text-sm py-2.5 px-6 rounded-full flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(214,228,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? (
								<>
									Analyzing... <Loader2 className="w-4 h-4 animate-spin" />
								</>
							) : (
								<>
									Analyze Notice <Zap className="w-4 h-4 fill-current" />
								</>
							)}
						</button>
					</div>
				</div>

				{analysis && !loading && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
						<div className="lg:col-span-2 flex flex-col gap-4">
							<div className="bg-card border border-border rounded-2xl p-7">
								<div className="flex justify-between items-start mb-6">
									<div>
										<h2 className="text-2xl font-bold text-white mb-1">{analysis.title}</h2>
										<p className="text-sm text-muted">Notice Ref: {analysis.reference}</p>
									</div>
									<div
										className={`flex items-center gap-1.5 border px-3 py-1 rounded-full ${
											analysis.urgency === "HIGH URGENCY"
												? "bg-red-500/10 border-red-500/20 text-red-500"
												: analysis.urgency === "MEDIUM URGENCY"
													? "bg-orange-500/10 border-orange-500/20 text-orange-500"
													: "bg-green-500/10 border-green-500/20 text-green-500"
										}`}
									>
										<div className="w-1.5 h-1.5 rounded-full bg-current"></div>
										<span className="text-[10px] font-bold uppercase tracking-wider">
											{analysis.urgency}
										</span>
									</div>
								</div>

								<div className="mb-8">
									<h3 className="text-[11px] font-bold text-[#7a8ba6] uppercase tracking-[0.15em] mb-4">
										The Plain English Summary
									</h3>
									<p className="text-[#d1d5db] text-base leading-relaxed">{analysis.summary}</p>
								</div>

								<div>
									<h3 className="text-[11px] font-bold text-[#7a8ba6] uppercase tracking-[0.15em] mb-4">
										Action Required
									</h3>
									<div className="space-y-4">
										{analysis.actions.map((item, i) => (
											<div key={i} className="flex gap-3">
												<div className="w-5 h-5 mt-0.5 rounded flex-shrink-0 border border-muted/40 flex items-center justify-center">
													<Check className="w-3.5 h-3.5 text-blue-400" />
												</div>
												<p className="text-sm text-[#d1d5db]">{item}</p>
											</div>
										))}
									</div>
								</div>
							</div>

							<div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center border border-border">
										<Download className="w-4 h-4 text-muted" />
									</div>
									<div>
										<h4 className="text-sm font-semibold text-white">Export Report</h4>
										<p className="text-[11px] text-muted mt-0.5">
											PDF, 1.2MB • Includes action checklist
										</p>
									</div>
								</div>
								<button className="bg-surface hover:bg-[#242833] text-white text-xs font-semibold py-2 px-4 rounded-lg border border-border transition-colors">
									Save to Dashboard
								</button>
							</div>
						</div>

						<div className="space-y-4">
							<div className="bg-card border border-border rounded-2xl p-6">
								<div className="flex items-center gap-2 mb-3">
									<Calendar className="w-4 h-4 text-orange-400" />
									<span className="text-sm font-semibold text-orange-400">Deadline</span>
								</div>
								<div className="mb-1">
									<span className="text-4xl font-bold text-white tracking-tight">
										{analysis.deadline_days} Days
									</span>
								</div>
								<p className="text-xs text-muted">Expires: {analysis.deadline_date}</p>
							</div>

							<div className="bg-[#1a2030] border border-[#232b3e] rounded-2xl p-6 relative overflow-hidden">
								<div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
									<Zap className="w-32 h-32" />
								</div>

								<div className="relative z-10">
									<h3 className="text-sm font-bold text-blue-300 mb-2">Need a Pro?</h3>
									<p className="text-xs text-[#a0b0cb] leading-relaxed mb-5">
										Connect with a tax attorney to handle this response for you.
									</p>
									<button className="w-full bg-[#0a0c10] hover:bg-black text-white text-xs font-semibold py-2.5 rounded-xl border border-white/5 transition-colors">
										Browse Experts
									</button>
								</div>
							</div>

							<div className="bg-card border border-border rounded-2xl p-6">
								<h3 className="text-[11px] font-bold text-[#7a8ba6] uppercase tracking-[0.1em] mb-4">
									Risk Level
								</h3>
								<div className="w-full h-1.5 bg-surface rounded-full mb-3 overflow-hidden">
									<div
										className="h-full bg-gradient-to-r from-[#ff9b7a] to-[#ff5f5f] rounded-full transition-all duration-1000 ease-out"
										style={{ width: `${analysis.risk_score}%` }}
									></div>
								</div>
								<p className="text-[10px] font-bold text-muted uppercase tracking-wide">
									Likely Audit Risk: {analysis.risk_score}%
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			<footer className="w-full py-6 px-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted mt-auto bg-background z-20">
				<p>© 2024 NotiClear. All rights reserved.</p>
				<div className="flex items-center gap-6">
					<a href="#" className="hover:text-white transition-colors">
						Privacy Policy
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Terms of Service
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Security
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Contact
					</a>
				</div>
			</footer>
		</div>
	);
}
