import * as path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		coverage: {
			enabled: true,
			include: ["src"],
			reporter: ["text", "html"],
		},
		environment: "jsdom",
		include: [
			path.resolve(__dirname, "./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)"),
		],
	},
});
