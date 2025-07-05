import { useState } from "react";

import type { PaneSubComponent } from "@/lib/types.js";

import { getSVGElement } from "@/lib/getSVGElement.js";
import { getSVGPoints } from "@/lib/getSVGPoints.js";
import { drawOverlay, onMouseDown } from "@/lib/overlay.js";
import { performChange } from "@/lib/performChange.js";

/**
 * Displays an overlay with the point locations over the preview pane.
 *
 * @param props The pane components.
 * @returns The component.
 */
const Overlay: PaneSubComponent = (props) => {
	const svg = getSVGElement(props);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const points = getSVGPoints(svg);

	if (canvas) {
		drawOverlay(points, canvas, svg);
	}

	return (
		<canvas
			className="absolute inset-0"
			onMouseDown={(e) => {
				if (!canvas) return;
				onMouseDown(
					e,
					canvas,
					points,
					(changeOptions) => performChange(props, changeOptions),
					svg,
				);
			}}
			ref={(newRef) => {
				if (newRef !== canvas) setCanvas(newRef);
			}}
		/>
	);
};

export default Overlay;
