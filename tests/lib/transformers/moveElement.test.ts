import { describe, it, expect } from "vitest";


import { moveElement } from "@/lib/transformers/index.js";
import type { SVGSubElement } from "@/lib/types.js";

import { createSVG } from "../../helpers.js";

describe("moveElement", () => {
	it("should move an element to a new parent", () => {
		const svg = createSVG(`
			<svg>
				<g id="parent">
					<rect id="child" />
				</g>
				<g id="newParent" />
			</svg>
		`);

		const parent = svg.querySelector("#parent") as SVGSubElement;
		const child = svg.querySelector("#child") as SVGSubElement;
		const newParent = svg.querySelector("#newParent") as SVGSubElement;

		moveElement(svg, {
			element: 1001,
			target: 2,
		});

		expect(parent.contains(child)).toBe(false);
		expect(newParent.contains(child)).toBe(true);
	});
});
