module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			boxShadow: {
				countyShadown: "0px 5px 10px gray",

			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
