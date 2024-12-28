import { useState } from "react";

import { getSVGElement } from "@/helpers/getSVGElement.js";
import { getSVGPoints } from "@/helpers/getSVGPoints.js";
import { drawOverlay, onMouseDown } from "@/helpers/overlay.js";
import { performChange } from "@/helpers/performChange.js";
import type { PaneSubComponent } from "@/types.js";

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
			ref={(newRef) => {
				if (newRef !== canvas) setCanvas(newRef);
			}}
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
		/>
	);
};

export default Overlay;
