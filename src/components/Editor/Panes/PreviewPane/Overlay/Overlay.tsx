import { useEffect, useRef } from "react";

import { getSVGElement } from "@/helpers/getSVGElement.js";
import { drawOverlay, onMouseDown } from "@/helpers/overlay.js";
import { findSVGPoints } from "@/helpers/parsers.js";
import type { PaneSubComponent } from "@/types.js";

/**
 * Displays an overlay with the point locations over the preview pane.
 *
 * @param props The pane components.
 * @returns The component.
 */
const Overlay: PaneSubComponent = (props) => {
	const { onChange } = props.stateTuple[0];
	const svg = getSVGElement(props);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const points = findSVGPoints(svg);
	useEffect(() => {
		if (canvasRef?.current && svg) {
			drawOverlay(points, canvasRef.current, svg);
		}
	}, [points, svg]);

	return (
		<canvas
			className="absolute inset-0"
			ref={canvasRef}
			onMouseDown={(e) =>
				onMouseDown(
					e,
					canvasRef.current!,
					points,
					(changeOptions) => onChange(changeOptions),
					svg,
				)
			}
		></canvas>
	);
};

export default Overlay;
