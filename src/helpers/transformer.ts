import React from 'react';
import { ChangeOperation, IChangeOptions } from 'types';

export function performChange<T extends IChangeOptions>(
	containerRef: React.RefObject<HTMLDivElement>,
	change: ChangeOperation<T>,
	currentSVG: string
): string {
	const shadowContainer = containerRef.current;
	if (!shadowContainer) return currentSVG;
	shadowContainer.innerHTML = currentSVG;
	const svgElem = shadowContainer.querySelector('svg');
	if (!svgElem) return currentSVG;
	const options = { ...change } as unknown as T;
	change.func(svgElem, options);
	const html = shadowContainer.innerHTML;
	shadowContainer.innerHTML = '';
	return html;
}
