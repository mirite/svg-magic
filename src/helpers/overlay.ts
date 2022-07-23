import {ChangeOptions, IMovePointOptions, IPoint, SVGSubElement} from "../types";
import React from "react";

const markerSize = 8;

export function drawOverlay(
	points: IPoint[],
	canvas: HTMLCanvasElement,
	svg: SVGElement
) {
	canvas.width = svg.clientWidth;
	canvas.height = svg.clientHeight;
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	context.fillStyle = 'blue';
	const {xAxis: xScale, yAxis: yScale} = getScale(canvas, svg);
	for (const point of points) {
		const {x, y} = point;
		const tolerance = markerSize / 2;
		const rect = [
			(x * xScale) - tolerance,
			(y * yScale) - tolerance,
			markerSize,
			markerSize,
		] as const;
		console.log(rect);
		context.fillRect(...rect);
	}
}

function getCursorPosition(canvas: HTMLCanvasElement, event: React.MouseEvent) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return {x, y};
}

export function findPoint(
	mouseDownX: number,
	mouseDownY: number,
	points: IPoint[]
): IPoint | null {
	const tolerance = markerSize / 2;
	for (const point of points) {
		const {x, y} = point;
		if (mouseDownX > x - tolerance && mouseDownX < x + tolerance) {
			if (mouseDownY > y - tolerance && mouseDownY < y + tolerance) {
				return point;
			}
		}
	}
	return null;
}

function getScale(canvas: HTMLCanvasElement, svg: SVGElement): { xAxis: number, yAxis: number } {
	const viewBox = svg.getAttribute("viewBox") || "0 0 100 100";
	const dimensions = viewBox.split(" ").map(Number.parseFloat);
	const {clientWidth: actualWidth, clientHeight: actualHeight} = svg;
	const xAxis = actualWidth / (dimensions[2] - dimensions[0]);
	const yAxis = actualHeight / (dimensions[3] - dimensions[1]);
	return {xAxis, yAxis};
}

function scaleCursor(
	x: number,
	y: number,
	current: HTMLCanvasElement,
	svg: SVGElement
): { scaledX: number; scaledY: number } {
	const {xAxis: xScale, yAxis: yScale} = getScale(current, svg);
	return {scaledX: x / xScale, scaledY: y / yScale};
}

function onMouseUp(
	e: React.MouseEvent,
	point: IPoint,
	canvas: HTMLCanvasElement,
	callback: (changeOptions: ChangeOptions) => void,
	svg: SVGElement
) {
	const {x, y} = getCursorPosition(canvas, e);
	const {scaledX, scaledY} = scaleCursor(x, y, canvas, svg);
	const options: IMovePointOptions = {
		type: 'movePoint',
		options: {
			element: point.owner as SVGSubElement,
			pointToMove: {x: point.x, y: point.y},
			newLocation: {x: scaledX, y: scaledY},
		},
	};
	callback(options);
	point.owner.classList.remove('active');
}

export function onMouseDown(e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement, points: IPoint[], onChange: (changeOptions: ChangeOptions) => void, svg: SVGElement) {

	const {x, y} = getCursorPosition(canvas, e);
	const {scaledX, scaledY} = scaleCursor(x, y, canvas, svg);
	const match = findPoint(scaledX, scaledY, points);
	if (match) {
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
			{once: true}
		);
	}
}
