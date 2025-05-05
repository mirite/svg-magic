import type { IMovePointOptions, SVGSubElement } from "@/types.js";

import { findShadowEquivalent } from "../dom.js";


/**
 * Moves a point in a line.
 *
 * @param c The point to check.
 * @param element The element to alter.
 * @param pointToMove The point being moved.
 * @param pointToMove.x The x coordinate of the point being moved.
 * @param pointToMove.y The y coordinate of the point being moved.
 * @param newLocation The new location of the point.
 * @param newLocation.x The x coordinate of the point's destination.
 * @param newLocation.y The y coordinate of the point's destination.
 * @returns True if the move was sucessful
 */
function checkLinePoint(
	c: string,
	element: SVGSubElement,
	pointToMove: { x: number; y: number },
	newLocation: { x: number; y: number },
): true | void {
	const portion = c.substring(1);
	const x = Number.parseFloat(element.getAttribute("x" + portion) || "0");
	const y = Number.parseFloat(element.getAttribute("y" + portion) || "0");
	if (pointToMove.x === x && pointToMove.y === y) {
		element.setAttribute("x" + portion, String(newLocation.x));
		element.setAttribute("y" + portion, String(newLocation.y));
		return true;
	}
}

/**
 * Moves a point on a polygon.
 *
 * @param element The element to alter.
 * @param pointToMove The point being moved.
 * @param pointToMove.x The x coordinate of the point being moved.
 * @param pointToMove.y The y coordinate of the point being moved.
 * @param newLocation The new location of the point.
 * @param newLocation.x The x coordinate of the point's destination.
 * @param newLocation.y The y coordinate of the point's destination.
 * @returns True if the move was sucessful.
 */
function checkPolyPoint(
	element: SVGSubElement,
	pointToMove: { x: number; y: number },
	newLocation: { x: number; y: number },
): true | void {
	const pointsList = element.getAttribute("points") || "";
	const values = pointsList.split(/[, ]+/g);
	for (let i = 0; i < values.length; i += 2) {
		const x = Number.parseFloat(values[i]);
		const y = Number.parseFloat(values[i + 1]);
		if (pointToMove.x === x && pointToMove.y === y) {
			values[i] = String(newLocation.x);
			values[i + 1] = String(newLocation.y);
			const newList = values.join(" ");
			element.setAttribute("points", newList);
			return true;
		}
	}
}

/**
 * Moves a point within an SVG
 *
 * @param svgElem The SVG element
 * @param change The change operation
 */
export function movePoint(
	svgElem: SVGSVGElement,
	change: IMovePointOptions,
): void {
	const { element: lightWorldElem, pointToMove, newLocation } = change;
	const element = findShadowEquivalent(lightWorldElem, svgElem);
	if (!element) {
		return;
	}
	for (const c of element.getAttributeNames()) {
		if (c.startsWith("x")) {
			if (checkLinePoint(c, element, pointToMove, newLocation)) return;
		} else if (c === "points") {
			if (checkPolyPoint(element, pointToMove, newLocation)) return;
		}
	}
}
