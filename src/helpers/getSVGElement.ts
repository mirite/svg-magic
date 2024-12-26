import type { FileProps } from "@/types.js";

/**
 * Helper for getting the active SVG element from the file props
 *
 * @param props The current file props
 * @returns The SVG element
 * @throws Error If the element couldn't be found
 */
export function getSVGElement(props: FileProps): SVGElement {
	const container = props.stateTuple[0].svgContainer;

	if (!container) {
		throw new Error("SVG Container missing from File State");
	}
	const svgElement = container.querySelector("svg");
	if (!svgElement) {
		throw new Error("SVG Element missing from container");
	}
	return svgElement;
}
