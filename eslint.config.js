import { general, getTailwind, react } from "@mirite/eslint-config-mirite";

export default [
	...general,
	...react,
	...getTailwind("./src/index.css"),
	{
		rules: {
			"import/no-unresolved": "off", // Doesn't work with the Vite aliases
		},
	},
];
