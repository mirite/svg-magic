import { describe, expect, it } from "vitest";

import { getCSSRules } from "@/lib/getCSSRules.js";

import { createSVG } from "../helpers.js";

describe("getCSSRules", () => {
	it("should find the stylesheet", () => {
		const svg = createSVG(`<svg><style>.a{fill:#fff}</style></svg>`);
		expect(getCSSRules(svg).length).toEqual(1);
	});

	it("should not find a stylesheet", () => {
		const svg = createSVG("<svg></svg>");
		expect(getCSSRules(svg).length).toEqual(0);
	});

	it("should not duplicate rules for multiple elements", () => {
		const svg = createSVG(
			`<svg><style>.a{fill:#fff}</style><g><line class="a"/><line class="a"/></g></svg>`,
		);
		expect(getCSSRules(svg).length).toEqual(1);
	});

	it("Should work with nested stylesheets", () => {
		const svg = createSVG(
			`<svg><defs><style>.a{fill:#fff}</style></defs><g><line class="a"/></g></svg>`,
		);
		expect(getCSSRules(svg).length).toEqual(1);
	});

	it("Should work with empty stylesheets", () => {
		const svg = createSVG(`<svg><style></style></svg>`);
		expect(getCSSRules(svg).length).toEqual(0);
	});
});
