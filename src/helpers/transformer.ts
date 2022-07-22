import React from 'react';
import {ChangeOptions, IGroupOptions, IMoveOptions} from 'types';
import {findShadowEquivalent} from "./dom";


function addGroup(shadowContainer: SVGElement, change: IGroupOptions) {
	const newGroup = document.createElement('g');
	shadowContainer.append(newGroup);
}

function moveElement(shadowContainer: SVGElement, change: IMoveOptions) {
	const {target, element} = change.options;
	const targetEquiv = findShadowEquivalent(target, shadowContainer);
	const elementEquiv = findShadowEquivalent(element, shadowContainer);
	if (targetEquiv && elementEquiv) {
		targetEquiv.append(elementEquiv);
	}
	console.log({element, elementEquiv, target, targetEquiv});
}

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
	}
	const html = shadowContainer.innerHTML;
	shadowContainer.innerHTML = '';
	return html;
}
