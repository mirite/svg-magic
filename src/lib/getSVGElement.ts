import type { FileProps } from "@/lib/types.js";

/**
 * Helper for getting the active SVG element from the file props
 *
 * @param props The current file props
 * @returns The SVG element
 */
export function getSVGElement(props: FileProps): SVGElement {
	const container = document.createElement("div");
	container.innerHTML = props.stateTuple[0].file.contents;
	const svgElement = container.firstChild as SVGSVGElement;
	return svgElement;
}
