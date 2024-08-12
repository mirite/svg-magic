import { stripAttribute } from "./stripAttribute";

/** @param svgElem */
export function stripIDs(svgElem: Element) {
	stripAttribute(svgElem, "id");
}
