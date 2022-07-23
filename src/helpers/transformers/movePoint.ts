import { IMovePointOptions, SVGSubElement } from 'types';
import { findShadowEquivalent } from '../dom';

function checkLinePoint(
	c: string,
	element: SVGSubElement,
	pointToMove: { x: number; y: number },
	newLocation: { x: number; y: number }
) {
	const portion = c.substring(1);
	const x = Number.parseFloat(element.getAttribute('x' + portion) || '0');
	const y = Number.parseFloat(element.getAttribute('y' + portion) || '0');
	if (pointToMove.x === x && pointToMove.y === y) {
		element.setAttribute('x' + portion, String(newLocation.x));
		element.setAttribute('y' + portion, String(newLocation.y));
		return true;
	}
}

function checkPolyPoint(
	element: SVGSubElement,
	pointToMove: { x: number; y: number },
	newLocation: { x: number; y: number }
) {
	const pointsList = element.getAttribute('points') || '';
	const values = pointsList.split(/[, ]+/g);
	for (let i = 0; i < values.length; i += 2) {
		const x = Number.parseFloat(values[i]);
		const y = Number.parseFloat(values[i + 1]);
		if (pointToMove.x === x && pointToMove.y === y) {
			values[i] = String(newLocation.x);
			values[i + 1] = String(newLocation.y);
			const newList = values.join(' ');
			element.setAttribute('points', newList);
			return true;
		}
	}
}

export function movePoint(svgElem: SVGSVGElement, change: IMovePointOptions) {
	const {
		element: lightWorldElem,
		pointToMove,
		newLocation,
	} = change.options;
	const element = findShadowEquivalent(lightWorldElem, svgElem);
	if (!element) {
		return;
	}
	for (const c of element.getAttributeNames()) {
		if (c.startsWith('x')) {
			if (checkLinePoint(c, element, pointToMove, newLocation)) return;
		} else if (c === 'points') {
			if (checkPolyPoint(element, pointToMove, newLocation)) return;
		}
	}
}
