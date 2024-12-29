import { describe, it, expect } from "vitest";

import { createSVG } from "./helpers.js";

import { getClasses } from "@/helpers/getClasses.js";

describe("getClasses", () => {
	it("should find classes", () => {
		const svg = createSVG(
			`<svg><style>.a{fill:#fff}</style><g><line class="a"/><line class="a"/></g></svg>`,
		);
		expect(getClasses(svg)).toEqual(["a"]);
	});
});
