/**
 * Removes the XML doctype from the SVG to prevent issues inlining.
 *
 * @param svgElem The original SVG content.
 * @returns The SVG content with the XML removed.
 */
export function stripXMLDeclaration(svgElem: string): string {
	return svgElem.replace(/<\?xml.+\?>/gi, "").trim();
}
