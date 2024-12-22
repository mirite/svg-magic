import { drawOverlay, onMouseDown } from "helpers/overlay";
import React, { useEffect, useRef } from "react";
import type { ChangeOperation, IPoint } from "types";

interface IProps {
	points: IPoint[];
	onChange: (changeOptions: ChangeOperation) => void;
	svg: SVGElement | null | undefined;
}

/** @param props */
function Overlay(props: IProps) {
	const { points, onChange, svg } = props;
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef?.current && svg) {
			drawOverlay(points, canvasRef.current, svg);
		}
	}, [points, svg]);

	if (!svg) {
		return null;
	}
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
}

export default Overlay;
