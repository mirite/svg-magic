import { ChangeOptions, IMovePointOptions, IPoint, SVGSubElement } from 'types';
import React from 'react';

const markerSize = 8;

const createMarkerRect = (
	x: number,
	xScale: number,
	y: number,
	yScale: number
) => {
	const tolerance = getTolerance();
	return [
		x * xScale - tolerance,
		y * yScale - tolerance,
		markerSize,
		markerSize,
	] as const;
};

export function drawOverlay(
	points: IPoint[],
	canvas: HTMLCanvasElement,
	svg: SVGElement
) {
	function setCanvasSize() {
		canvas.width = svg.clientWidth;
		canvas.height = svg.clientHeight;
	}

	function clearCanvas(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	}

	setCanvasSize();
	const context = canvas.getContext('2d');
	if (!context) return;
	const { xAxis: xScale, yAxis: yScale } = getScale(canvas, svg);
	clearCanvas(context);
	context.fillStyle = 'blue';
	for (const point of points) {
		const { x, y } = point;
		context.fillRect(...createMarkerRect(x, xScale, y, yScale));
	}
}

function getCursorPosition(canvas: HTMLCanvasElement, event: React.MouseEvent) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return { x, y };
}

function getTolerance() {
	return markerSize / 2;
}

export function findPoint(
	mouseDownX: number,
	mouseDownY: number,
	points: IPoint[]
): IPoint | null {
	const tolerance = getTolerance();
	for (const point of points) {
		const { x, y } = point;
		if (mouseDownX > x - tolerance && mouseDownX < x + tolerance) {
			if (mouseDownY > y - tolerance && mouseDownY < y + tolerance) {
				return point;
			}
		}
	}
	return null;
}

function getScale(
	canvas: HTMLCanvasElement,
	svg: SVGElement
): { xAxis: number; yAxis: number } {
	const viewBox = svg.getAttribute('viewBox') || '0 0 100 100';
	const [x1, y1, x2, y2] = viewBox.split(' ').map(Number.parseFloat);
	const { clientWidth: actualWidth, clientHeight: actualHeight } = svg;
	const xAxis = actualWidth / (x2 - x1);
	const yAxis = actualHeight / (y2 - y1);
	return { xAxis, yAxis };
}

function scaleCursor(
	x: number,
	y: number,
	current: HTMLCanvasElement,
	svg: SVGElement
): { scaledX: number; scaledY: number } {
	const { xAxis: xScale, yAxis: yScale } = getScale(current, svg);
	return { scaledX: x / xScale, scaledY: y / yScale };
}

function createMovePointOptions(
	point: IPoint,
	scaledX: number,
	scaledY: number
): IMovePointOptions {
	return {
		type: 'movePoint',
		options: {
			element: point.owner as SVGSubElement,
			pointToMove: { x: point.x, y: point.y },
			newLocation: { x: scaledX, y: scaledY },
		},
	};
}

function onMouseUp(
	e: React.MouseEvent,
	point: IPoint,
	canvas: HTMLCanvasElement,
	callback: (changeOptions: ChangeOptions) => void,
	svg: SVGElement
) {
	const { x, y } = getCursorPosition(canvas, e);
	const { scaledX, scaledY } = scaleCursor(x, y, canvas, svg);
	const options = createMovePointOptions(point, scaledX, scaledY);
	callback(options);
	point.owner.classList.remove('active');
}

export function onMouseDown(
	e: React.MouseEvent<HTMLCanvasElement>,
	canvas: HTMLCanvasElement,
	points: IPoint[],
	onChange: (changeOptions: ChangeOptions) => void,
	svg: SVGElement
) {
	const { x, y } = getCursorPosition(canvas, e);
	const { scaledX, scaledY } = scaleCursor(x, y, canvas, svg);
	const match = findPoint(scaledX, scaledY, points);
	if (!match) return;
	match.owner.classList.add('active');
	e.currentTarget.addEventListener(
		'mouseup',
		(mouseUpE) =>
			onMouseUp(
				mouseUpE as unknown as React.MouseEvent,
				match,
				canvas,
				onChange,
				svg
			),
		{ once: true }
	);
}
