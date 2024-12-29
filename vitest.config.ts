import * as path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		include: [
			path.resolve(__dirname, "./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)"),
		],
		coverage: {
			enabled: true,
			include: ["src"],
			reporter: ["text", "html"],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
