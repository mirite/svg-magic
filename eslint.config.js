import { general, react, tailwind } from "@mirite/eslint-config-mirite";

export default [
	...general,
	...react,
	...tailwind,
	{
		rules: {
			"import/no-unresolved": "off", // Doesn't work with the Vite aliases
		},
	},
];
