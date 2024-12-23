import type React from "react";
import type {
	ChangeOperation,
	IMovePointOptions,
	IPoint,
	SVGSubElement,
} from "@/types.js";

import { movePoint } from "./transformers/index.js";

/** The pixel width/height of the marker that shows on points. */
const markerSize = 8;

/**
 * Creates the rectangle that marks a point on the canvas.
 *
 * @param x
 * @param xScale
 * @param y
 * @param yScale
 */
const createMarkerRect = (
	x: number,
	xScale: number,
	y: number,
	yScale: number,
) => {
	const tolerance = getTolerance();
	return [
		x * xScale - tolerance,
		y * yScale - tolerance,
		markerSize,
		markerSize,
	] as const;
};

/**
 * Draws the overlay on the canvas showing where points on the SVG are.
 *
 * @param points The points to display on the overlay.
 * @param canvas The canvas to draw the overlay on.
 * @param svg The SVG element to generate the overlay for.
 */
export function drawOverlay(
	points: IPoint[],
	canvas: HTMLCanvasElement,
	svg: SVGElement,
) {
	/** Forces the canvas to match the size of the SVG behind it. */
	function setCanvasSize() {
		canvas.width = svg.clientWidth;
		canvas.height = svg.clientHeight;
	}

	/**
	 * Clears the canvas for a fresh drawing
	 *
	 * @param ctx
	 */
	function clearCanvas(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	}

	setCanvasSize();
	const context = canvas.getContext("2d");
	if (!context) return;
	const { xScale, yScale } = getScale(svg);
	clearCanvas(context);
	context.fillStyle = "blue";
	for (const point of points) {
		const { x, y } = point;
		context.fillRect(...createMarkerRect(x, xScale, y, yScale));
	}
}

/**
 * Retrieves the coordinates of a mouse even relative to the canvas element.
 *
 * @param canvas
 * @param event
 */
function getCursorPosition(canvas: HTMLCanvasElement, event: React.MouseEvent) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return { x, y };
}

/** Gets the distance around a point where the marker exists. */
function getTolerance() {
	return markerSize / 2;
}

/**
 * Finds the point that matches with where the mouse was clicked.
 *
 * @param mouseDownX
 * @param mouseDownY
 * @param points
 */
export function findPoint(
	mouseDownX: number,
	mouseDownY: number,
	points: IPoint[],
): IPoint | undefined {
	const tolerance = getTolerance();
	const evaluatePoint = (point: IPoint) => {
		const { x, y } = point;
		if (mouseDownX > x - tolerance && mouseDownX < x + tolerance) {
			if (mouseDownY > y - tolerance && mouseDownY < y + tolerance) {
				return point;
			}
		}
	};
	for (const point of points) {
		if (evaluatePoint(point)) return point;
	}
}

/**
 * Gets the SVG:Actual display size ratio from the svg viewBox and the actual
 * element size.
 *
 * @param svg
 */
function getScale(svg: SVGElement) {
	const viewBox = svg.getAttribute("viewBox") || "0 0 100 100";
	const [x1, y1, x2, y2] = viewBox.split(" ").map(Number.parseFloat);
	const { clientWidth: actualWidth, clientHeight: actualHeight } = svg;
	const xScale = actualWidth / (x2 - x1);
	const yScale = actualHeight / (y2 - y1);
	return { xScale, yScale };
}

/**
 * Returns the cursor coordinates relative to the SVG viewBox.
 *
 * @param x
 * @param y
 * @param svg
 */
function scaleCursor(
	x: number,
	y: number,
	svg: SVGElement,
): { scaledX: number; scaledY: number } {
	const { xScale, yScale } = getScale(svg);
	return { scaledX: x / xScale, scaledY: y / yScale };
}

/**
 * Creates the options object to tell the transformer to transform.
 *
 * @param point
 * @param newX
 * @param newY
 */
function createMovePointOptions(
	point: IPoint,
	newX: number,
	newY: number,
): IMovePointOptions {
	const { x, y, owner } = point;
	return {
		element: owner as SVGSubElement,
		pointToMove: { x, y },
		newLocation: { x: newX, y: newY },
	};
}

/**
 * @param e
 * @param point
 * @param canvas
 * @param callback
 * @param svg
 */
function onMouseUp(
	e: React.MouseEvent,
	point: IPoint,
	canvas: HTMLCanvasElement,
	callback: (changeOptions: ChangeOperation) => void,
	svg: SVGElement,
) {
	const { x, y } = getCursorPosition(canvas, e);
	const { scaledX, scaledY } = scaleCursor(x, y, svg);
	const options = createMovePointOptions(point, scaledX, scaledY);
	callback((elem) => movePoint(elem, options));
	point.owner.classList.remove("active");
}

/**
 * @param e
 * @param canvas
 * @param points
 * @param onChange
 * @param svg
 */
export function onMouseDown(
	e: React.MouseEvent<HTMLCanvasElement>,
	canvas: HTMLCanvasElement,
	points: IPoint[],
	onChange: (changeOptions: ChangeOperation) => void,
	svg: SVGElement,
) {
	const { x, y } = getCursorPosition(canvas, e);
	const { scaledX, scaledY } = scaleCursor(x, y, svg);
	const match = findPoint(scaledX, scaledY, points);
	if (!match) return;
	match.owner.classList.add("active");
	e.currentTarget.addEventListener(
		"mouseup",
		(mouseUpE) =>
			onMouseUp(
				mouseUpE as unknown as React.MouseEvent,
				match,
				canvas,
				onChange,
				svg,
			),
		{ once: true },
	);
}
