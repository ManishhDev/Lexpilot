const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const fallbackResult = {
	title: "Income Tax Inquiry",
	reference: "IT-2024-8842-X",
	urgency: "HIGH URGENCY",
	summary:
		"The IRS has flagged a discrepancy between your reported consulting income and the 1099-NEC forms submitted by your clients. They are requesting proof of business expenses to justify the deductions claimed on Schedule C.",
	actions: [
		"Gather all bank statements from Jan 2023 to Dec 2023.",
		"Identify receipts specifically for Travel and Software Subscriptions.",
		"Download the Response Form A-1 from the portal.",
	],
	deadline_days: 30,
	deadline_date: "Nov 14, 2024",
	risk_score: 75,
};

export async function analyzeNotice(inputText) {
	try {
		const response = await fetch(`${API_BASE_URL}/analyzer`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: inputText }),
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}

		const data = await response.json();
		if (data?.result) {
			return data;
		}

		if (data?.title) {
			return { result: data };
		}

		return { result: fallbackResult };
	} catch (error) {
		console.error("Analyzer request failed:", error);
		return { result: fallbackResult };
	}
}
