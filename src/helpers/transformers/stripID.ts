import { stripAttribute } from "./stripAttribute.js";

/** @param svgElem */
export function stripIDs(svgElem: Element) {
	stripAttribute(svgElem, "id");
}
