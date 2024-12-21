import type React from "react";
import type { ChangeOperation } from "types";

/**
 * @param containerRef
 * @param change
 * @param currentSVG
 */
export function performChange(
	containerRef: React.RefObject<HTMLDivElement | null>,
	change: ChangeOperation,
	currentSVG: string,
): string {
	const shadowContainer = containerRef.current;
	if (!shadowContainer) return currentSVG;
	shadowContainer.innerHTML = currentSVG;
	const svgElem = shadowContainer.querySelector("svg");
	if (!svgElem) return currentSVG;
	change(svgElem);
	const html = shadowContainer.innerHTML;
	shadowContainer.innerHTML = "";
	return html;
}
