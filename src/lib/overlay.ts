import type React from "react";

import type {
	ChangeOperation,
	IMovePointOptions,
	IPoint,
	SVGSubElement,
} from "@/lib/types.js";

import { movePoint } from "./transformers/index.js";

/** The pixel width/height of the marker that shows on points. */
const markerSize = 8;

/**
 * Creates the rectangle that marks a point on the canvas.
 *
 * @param x The x-coordinate of the point.
 * @param xScale The scale of the x-axis.
 * @param y The y-coordinate of the point.
 * @param yScale The scale of the y-axis.
 * @returns The rectangle that marks the point.
 */
const createMarkerRect = (
	x: number,
	xScale: number,
	y: number,
	yScale: number,
): Readonly<[x1: number, y1: number, x2: number, y2: number]> => {
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
): void {
	/** Forces the canvas to match the size of the SVG behind it. */
	function setCanvasSize() {
		canvas.width = svg.clientWidth;
		canvas.height = svg.clientHeight;
	}

	/**
	 * Clears the canvas for a fresh drawing
	 *
	 * @param ctx The canvas context to clear.
	 */
	function clearCanvas(ctx: CanvasRenderingContext2D): void {
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
 * Retrieves the-coordinates of a mouse even relative to the canvas element.
 *
 * @param canvas The canvas element to get the-coordinates for.
 * @param event The mouse event to get the-coordinates from.
 * @returns The-coordinates of the mouse event relative to the canvas.
 */
function getCursorPosition(
	canvas: HTMLCanvasElement,
	event: React.MouseEvent,
): { x: number; y: number } {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return { x, y };
}

/**
 * Gets the distance around a point where the marker exists.
 *
 * @returns The distance around a point where the marker exists.
 */
function getTolerance(): number {
	return markerSize / 2;
}

/**
 * Finds the point that matches with where the mouse was clicked.
 *
 * @param mouseDownX The x-coordinate of the mouse down event.
 * @param mouseDownY The y-coordinate of the mouse down event.
 * @param points The points to search for a match in.
 * @returns The point that matches the mouse down event or null if none match.
 */
export function findPoint(
	mouseDownX: number,
	mouseDownY: number,
	points: IPoint[],
): IPoint | null {
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
	return null;
}

/**
 * Gets the SVG:Actual display size ratio from the svg viewBox and the actual
 * element size.
 *
 * @param svg The SVG element to get the scale for.
 * @returns The x and y scale of the SVG element.
 */
function getScale(svg: SVGElement): { xScale: number; yScale: number } {
	const viewBox = svg.getAttribute("viewBox") || "0 0 100 100";
	const [x1, y1, x2, y2] = viewBox.split(" ").map(Number.parseFloat);
	const { clientWidth: actualWidth, clientHeight: actualHeight } = svg;
	const xScale = actualWidth / (x2 - x1);
	const yScale = actualHeight / (y2 - y1);
	return { xScale, yScale };
}

/**
 * Returns the cursor-coordinates relative to the SVG viewBox.
 *
 * @param x The x-coordinate of the cursor.
 * @param y The y-coordinate of the cursor.
 * @param svg The SVG element to get the scale from.
 * @returns The scaled x and y-coordinates.
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
 * @param point The point to move.
 * @param newX The new x-coordinate of the point.
 * @param newY The new y-coordinate of the point.
 * @returns The options object to move the point.
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
 * Handles the mouse up event for moving points.
 *
 * @param e The mouse event.
 * @param point The point to move.
 * @param canvas The canvas element.
 * @param callback The callback to change the SVG.
 * @param svg The SVG element.
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
 * Handles the mouse down event for moving points.
 *
 * @param e The mouse event.
 * @param canvas The canvas element.
 * @param points The points on the SVG.
 * @param onChange The callback to change the SVG.
 * @param svg The SVG element.
 */
export function onMouseDown(
	e: React.MouseEvent<HTMLCanvasElement>,
	canvas: HTMLCanvasElement,
	points: IPoint[],
	onChange: (changeOptions: ChangeOperation) => void,
	svg: SVGElement,
): void {
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
