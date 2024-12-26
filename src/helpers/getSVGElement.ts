import type { FileProps } from "@/types.js";

/**
 * Helper for getting the active SVG element from the file props
 *
 * @param props The current file props
 * @returns The SVG element or null if it is not available.
 */
export function getSVGElement(props: FileProps): SVGElement | null {
	const container = props.stateTuple[0].svgContainer;

	if (!container) {
		return null;
	}
	const svgElement = container.querySelector("svg");
	if (!svgElement) {
		return null;
	}
	return svgElement;
}
