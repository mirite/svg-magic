/**
 * Create a SVG element from a string
 *
 * @param content The SVG content
 * @returns The SVG element
 */
export function createSVG(content: string): SVGSVGElement {
	const div = document.createElement("div");
	div.innerHTML = content;
	return div.querySelector("svg")!;
}
