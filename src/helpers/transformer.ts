import type { ChangeOperation, FileProps } from "@/types.js";

/**
 * Helper for altering the SVG.
 *
 * @param fileState The current file state
 * @param change The change to perform
 */
export function performChange(
	fileState: FileProps,
	change: ChangeOperation,
): void {
	const svgElem = document.createElement("svg") as unknown as SVGSVGElement;
	svgElem.outerHTML = fileState.stateTuple[0].file.contents;
	change(svgElem);
	const html = svgElem.outerHTML;
	fileState.stateTuple[1]((previous) => {
		const newState = { ...previous };
		newState.file.contents = html;
		return newState;
	});
}
