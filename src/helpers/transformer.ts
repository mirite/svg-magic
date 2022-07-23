import React from 'react';
import {
	ChangeOptions,
	IAssignClassOptions,
	IClassOptions,
	IGroupOptions,
	IMoveOptions,
	IStripDataOptions,
	IStripIDOptions,
} from 'types';
import {findShadowEquivalent} from './dom';
import {removeCSSClass, renameCSSClass} from "./css";

function addGroup(shadowContainer: SVGElement, change: IGroupOptions) {
	const {className, selectedItems} = change.options;
	const newGroup = document.createElement('g');
	newGroup.className = className || '';
	if (selectedItems) {
		for (const path of selectedItems) {
			const elementEquiv = findShadowEquivalent(
				path.elem,
				shadowContainer
			);
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

function stripIDFromSVG(svgElem: Element) {
	const func = (elem: Element) => {
		elem.removeAttribute("id");
	}
	traverseTree(svgElem, func);
}

function stripDataFromSVG(svgElem: SVGSVGElement) {
	const func = (elem: Element) => {
		for (const [key, value] of Object.entries((elem as HTMLElement)?.dataset)) {
			elem.removeAttribute("data-" + key);
		}
	}
	traverseTree(svgElem, func);
}

export function traverseTree(elem: Element, func: (e: Element) => unknown) {
	func(elem);
	for (const child of elem.children) {
		traverseTree(child, func);
	}
}

function removeClass(svgElem: SVGSVGElement, change: IClassOptions) {
	const func = (elem: Element) => {
		elem.classList.remove(change.options.existingClassName);
	}
	traverseTree(svgElem, func);
	setShadowCSS(svgElem, removeCSSClass, change.options.existingClassName);
}

function renameClass(svgElem: SVGSVGElement, change: IClassOptions) {
	const func = (elem: Element) => {
		if (elem.classList.contains(change.options.existingClassName)) {
			elem.classList.remove(change.options.existingClassName);
			elem.classList.add(change.options.newClassName ?? "");
		}

	}
	traverseTree(svgElem, func);
	setShadowCSS(svgElem, renameCSSClass, change.options.existingClassName, change.options.newClassName);
}

function setShadowCSS(svgElem: Element, func: (text: string,  ...args:any[]) => string, ...args:unknown[]) {
	const style = svgElem.querySelector("style");
	if (!style) return;
	style.innerHTML = func(style.innerHTML, ...args);
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
		case 'assign':
			assignClass(svgElem, change);
			break;
		case 'strip':
			stripIDFromSVG(svgElem)
			break;
		case "stripData":
			stripDataFromSVG(svgElem)
			break
		case "removeClass":
			removeClass(svgElem, change)
			break
		case "renameClass":
			renameClass(svgElem, change)
			break
	}
	const html = shadowContainer.innerHTML;
	shadowContainer.innerHTML = '';
	return html;
}

export const stripIDs: IStripIDOptions = {
	type: "strip"
}

export const stripData: IStripDataOptions = {
	type: "stripData"
}
