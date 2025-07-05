import type { IPoint, SVGSubElement } from "@/lib/types.js";

/**
 * Find the points used in the SVG
 *
 * @param element The element to check
 * @param existing The points already found
 * @returns The points found.
 */
export function getSVGPoints(
	element: SVGSubElement,
	existing?: Set<IPoint>,
): IPoint[] {
	const localExistingRef = existing ?? new Set<IPoint>();
	for (const c of element.getAttributeNames()) {
		if (c.startsWith("x")) {
			const portion = c.substring(1);
			const x = Number.parseFloat(element.getAttribute("x" + portion) || "0");
			const y = Number.parseFloat(element.getAttribute("y" + portion) || "0");
			if ((x || x === 0) && (y || y === 0)) {
				localExistingRef.add({ owner: element, x, y });
			}
		} else if (c === "points") {
			const pointsList = element.getAttribute("points") || "";
			const values = pointsList.split(/[, ]+/g);
			for (let i = 0; i < values.length; i += 2) {
				const x = Number.parseFloat(values[i]);
				const y = Number.parseFloat(values[i + 1]);
				localExistingRef.add({ owner: element, x, y });
			}
		}
	}
	for (const child of element.children) {
		getSVGPoints(child as SVGSubElement, localExistingRef);
	}
	return Array.from(localExistingRef);
}
