import React from 'react';
import { ChangeOptions } from 'types';
import {
	addGroup,
	assignClass,
	moveElement,
	movePoint,
	prefixClassesInSVG,
	removeClass,
	renameClass,
	stripDataFromSVG,
	stripIDFromSVG,
} from './transformers';

export function performChange(
	containerRef: React.RefObject<HTMLDivElement>,
	change: ChangeOptions,
	currentSVG: string
): string {
	const shadowContainer = containerRef.current;
	if (!shadowContainer) return currentSVG;
	shadowContainer.innerHTML = currentSVG;
	const svgElem = shadowContainer.querySelector('svg');
	if (!svgElem) return currentSVG;

	switch (change.type) {
		case 'group':
			addGroup(svgElem, change);
			break;
		case 'move':
			moveElement(svgElem, change);
			break;
		case 'assign':
			assignClass(svgElem, change);
			break;
		case 'strip':
			stripIDFromSVG(svgElem);
			break;
		case 'stripData':
			stripDataFromSVG(svgElem);
			break;
		case 'removeClass':
			removeClass(svgElem, change);
			break;
		case 'renameClass':
			renameClass(svgElem, change);
			break;
		case 'movePoint':
			movePoint(svgElem, change);
			break;
		case 'prefixClasses':
			prefixClassesInSVG(svgElem, change);
	}
	const html = shadowContainer.innerHTML;
	shadowContainer.innerHTML = '';
	return html;
}
