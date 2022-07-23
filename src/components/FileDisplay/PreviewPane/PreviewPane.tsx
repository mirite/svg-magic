import React, { useEffect, useRef, useState } from 'react';
import styles from './PreviewPane.module.css';
import { ChangeOptions, IMovePointOptions, IPoint, SVGSubElement } from 'types';

interface IProps {
	containerRef: React.RefObject<HTMLDivElement>;
	svgHTML: string;
	points: IPoint[];
	onChange: (changeOptions: ChangeOptions) => void;
}

const markerSize = 8;

function drawOverlay(
	points: IPoint[],
	canvasRef: React.MutableRefObject<HTMLCanvasElement>
) {
	const canvas = canvasRef.current;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	context.fillStyle = 'blue';
	const scale = getScale(canvas);
	for (const point of points) {
		const { x, y } = point;
		const rect = [
			x * scale - markerSize / 2,
			y * scale - markerSize / 2,
			markerSize,
			markerSize,
		] as const;
		context.fillRect(...rect);
	}
}

function getCursorPosition(canvas: HTMLCanvasElement, event: React.MouseEvent) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return { x, y };
}

function findPoint(
	mouseDownX: number,
	mouseDownY: number,
	points: IPoint[]
): IPoint | null {
	const tolerance = markerSize / 2;
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

function getScale(canvas: HTMLCanvasElement) {
	return canvas.clientWidth / 100;
}

function scaleCursor(
	x: number,
	y: number,
	current: HTMLCanvasElement
): { scaledX: number; scaledY: number } {
	const scale = getScale(current);
	return { scaledX: x / scale, scaledY: y / scale };
}

function onMouseUp(
	e: React.MouseEvent,
	point: IPoint,
	canvas: HTMLCanvasElement,
	callback: (changeOptions: ChangeOptions) => void
) {
	const { x, y } = getCursorPosition(canvas, e);
	const { scaledX, scaledY } = scaleCursor(x, y, canvas);
	const options: IMovePointOptions = {
		type: 'movePoint',
		options: {
			element: point.owner as SVGSubElement,
			pointToMove: { x: point.x, y: point.y },
			newLocation: { x: scaledX, y: scaledY },
		},
	};
	callback(options);
	point.owner.classList.remove('active');
}

function PreviewPane(props: IProps) {
	const { containerRef, svgHTML, points } = props;
	const [base64, setBase64] = useState('');
	const [isDark, setIsDark] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
		if (!canvasRef.current) return;
		const { x, y } = getCursorPosition(canvasRef.current, e);
		const { scaledX, scaledY } = scaleCursor(x, y, canvasRef.current);
		const match = findPoint(scaledX, scaledY, points);
		if (match) {
			match.owner.classList.add('active');
			e.currentTarget.addEventListener(
				'mouseup',
				(mouseUpE) =>
					onMouseUp(
						mouseUpE as unknown as React.MouseEvent,
						match,
						canvasRef.current,
						props.onChange
					),
				{ once: true }
			);
		}
	}

	useEffect(() => {
		setBase64(window.btoa(svgHTML));
	}, [svgHTML]);

	useEffect(() => {
		if (canvasRef?.current) {
			drawOverlay(points, canvasRef);
		}
	}, [props]);

	return (
		<div
			className={
				styles.previewPane + ' ' + (isDark ? styles.dark : styles.light)
			}
		>
			<div className={styles.title}>
				<h2>Preview</h2>
				<label>
					Dark:{' '}
					<input
						type="checkbox"
						checked={isDark}
						onChange={(e) => setIsDark(e.currentTarget.checked)}
					/>
				</label>
			</div>
			<h3>&lt;svg&gt;</h3>
			<div className={styles.livePreview}>
				<div
					className={styles.preview}
					ref={containerRef}
					dangerouslySetInnerHTML={{ __html: svgHTML }}
				></div>
				<canvas
					ref={canvasRef}
					onMouseDown={(e) => handleMouseDown(e)}
				></canvas>
			</div>
			<h3>&lt;img&gt;</h3>
			<div className={styles.preview}>
				<img
					src={'data:image/svg+xml;base64,' + base64}
					alt="preview"
				/>
			</div>
		</div>
	);
}

export default PreviewPane;
