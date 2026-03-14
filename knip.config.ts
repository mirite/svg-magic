import type { KnipConfig } from "knip";

const config: KnipConfig = {
	vitest: {
		entry: "tests/**/*.test.{ts,tsx}",
	},
};
export default config;
