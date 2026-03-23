/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#0a0c10",
				surface: "#15171e",
				card: "#1c1f28",
				"card-hover": "#242833",
				border: "#2d3240",
				primary: "#d6e4ff",
				muted: "#8e96a8",
			},
		},
	},
	plugins: [],
};
