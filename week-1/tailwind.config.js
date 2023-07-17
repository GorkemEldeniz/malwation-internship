/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	darkMode: "class",
	purge: ["./**/*.html"],
	// content: ["./**/*.{html,js}"],
	theme: {
		color: {},
		extend: {},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			const neonUtilities = {};
			const colors = theme("colors");

			// loop through the colors
			for (const color in colors) {
				// Check if color is an object as some colors in
				// Tailwind are objects and some are strings
				if (typeof colors[color] === "object") {
					// we opt in to use 2 colors
					const targetColor = colors[color];
					for (let [key, value] of Object.entries(targetColor)) {
						// Here we build the actual class name
						console.log(key);
						neonUtilities[`.border-solid-${color}-${key}`] = {
							border: `1px solid ${value}`,
						};
					}
				}
			}
			addUtilities(neonUtilities);
		},
	],
};
