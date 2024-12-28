import { describe, expect, it } from "vitest";

import { getCSSRules } from "@/helpers/getCSSRules.js";

describe("getCSSRules", () => {
	it("should find the stylesheet", () => {
		const content = `<svg><style>.a{fill:#fff}</style></svg>`;
		const div = document.createElement("div");
		div.innerHTML = content;
		const svg = div.querySelector("svg")!;
		expect(getCSSRules(svg).length).toEqual(1);
	});

	it("should not find a stylesheet", () => {
		const content = `<svg></svg>`;
		const div = document.createElement("div");
		div.innerHTML = content;
		const svg = div.querySelector("svg")!;
		expect(getCSSRules(svg).length).toEqual(0);
	});

	it("should not duplicate rules for multiple elements", () => {
		const content = `<svg><style>.a{fill:#fff}</style><g><line class="a"/><line class="a"/></g></svg>`;
		const div = document.createElement("div");
		div.innerHTML = content;
		const svg = div.querySelector("svg")!;
		expect(getCSSRules(svg).length).toEqual(1);
	});

	it("Should work with nested stylesheets", () => {
		const content = `<svg><defs><style>.a{fill:#fff}</style></defs><g><line class="a"/></g></svg>`;
		const div = document.createElement("div");
		div.innerHTML = content;
		const svg = div.querySelector("svg")!;
		expect(getCSSRules(svg).length).toEqual(1);
	});

	it("Should work with empty stylesheets", () => {
		const content = `<svg><style></style></svg>`;
		const div = document.createElement("div");
		div.innerHTML = content;
		const svg = div.querySelector("svg")!;
		expect(getCSSRules(svg).length).toEqual(0);
	});
});
