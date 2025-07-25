import { describe, expect, it } from "vitest";

import { getSVGChildren } from "@/lib/getSVGChildren.js";
import { assignClass } from "@/lib/transformers/index.js";

import { createSVG } from "../../helpers.js";

describe("assignClass", () => {
	it("Should assign a class to selected elements", () => {
		const elem = createSVG(
			`<svg><line></line><line></line><line class="hi"></line></svg>`,
		);
		const nodes = getSVGChildren(elem);
		const options = {
			className: "test",
			selectedItems: [nodes[0].id, nodes[2].id],
		};
		assignClass(elem, options);
		expect(elem.children[0].getAttribute("class")).toBe("test");
		expect(elem.children[2].getAttribute("class")).toBe("hi test");
	});

	it("Should assign a class to elements and children when both selected", () => {
		const elem = createSVG(
			`<svg><g><line></line></g><line></line><line></line></svg>`,
		);
		const nodes = getSVGChildren(elem);
		const options = {
			className: "test",
			selectedItems: [nodes[0].id, nodes[0].children[0].id],
		};
		assignClass(elem, options);
		expect(elem.children[0].getAttribute("class")).toBe("test");
		expect(elem.children[0].children[0].getAttribute("class")).toBe("test");
	});
});
