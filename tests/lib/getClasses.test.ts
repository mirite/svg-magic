import { describe, it, expect } from "vitest";

import { getClasses } from "@/lib/getClasses.js";

import { createSVG } from "../helpers.js";

describe("getClasses", () => {
	it("should find classes", () => {
		const svg = createSVG(
			`<svg><style>.a{fill:#fff}</style><g><line class="a"/><line class="a"/></g></svg>`,
		);
		expect(getClasses(svg)).toEqual(["a"]);
	});
});
