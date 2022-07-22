import React from 'react';
import {ChangeOptions, IAssignClassOptions, IGroupOptions, IMoveOptions} from 'types';
import {findShadowEquivalent} from './dom';

function addGroup(shadowContainer: SVGElement, change: IGroupOptions) {
	const {className, selectedItems} = change.options;
	const newGroup = document.createElement('g');
	newGroup.className = className || '';
	if (selectedItems) {
		for (const path of selectedItems) {
			const elementEquiv = findShadowEquivalent(path.elem, shadowContainer);
			if (elementEquiv) {
				newGroup.append(elementEquiv);
			}
		}
	}
	shadowContainer.append(newGroup);
}

function moveElement(shadowContainer: SVGElement, change: IMoveOptions) {
	const {target, element} = change.options;
	const targetEquiv = findShadowEquivalent(target, shadowContainer);
	const elementEquiv = findShadowEquivalent(element, shadowContainer);
	if (targetEquiv && elementEquiv) {
		targetEquiv.append(elementEquiv);
	}
}

function assignClass(svgElem: SVGSVGElement, change: IAssignClassOptions) {
	for (const path of change.options.selectedItems) {
		const shadow = findShadowEquivalent(path.elem, svgElem);
		if (shadow) {
			shadow.classList.add(change.options.className);
		}
	}
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
		case "assign":
			assignClass(svgElem, change);
			break;
	}
	const html = shadowContainer.innerHTML;
	shadowContainer.innerHTML = '';
	return html;
}
