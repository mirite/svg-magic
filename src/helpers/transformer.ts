import React from "react";
import { ChangeOperation } from "types";

export function performChange(
  containerRef: React.RefObject<HTMLDivElement>,
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
