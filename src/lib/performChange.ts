import type { ChangeOperation, FileProps } from "@/lib/types.js";

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
	const container = document.createElement("div");
	container.innerHTML = fileState.stateTuple[0].file.contents;
	const svgElem = container.querySelector("svg") as SVGSVGElement;
	change(svgElem);
	const html = svgElem.outerHTML;
	fileState.stateTuple[1]((previous) => {
		const newState = { ...previous };
		newState.file.contents = html;
		return newState;
	});
}
