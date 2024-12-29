import { useState } from "react";

import { getSVGChildren } from "./getSVGChildren.js";
import { getSVGElement } from "./getSVGElement.js";

import type { FileProps, IPath } from "@/types.js";

export type UseNodesResult = {
	selected: IPath[];
	updateSelected: (clickedPath: IPath) => void;
	node: IPath;
};

/**
 * Get the nodes from the SVG element.
 *
 * @param props The component props.
 * @returns The nodes with selected state.
 */
export function useNodes(props: FileProps): UseNodesResult {
	const [selected, setSelected] = useState<IPath[]>([]);
	const svgRoot = getSVGElement(props);
	const children = getSVGChildren(svgRoot);

	const root: IPath = { name: "root", elem: svgRoot, children, id: 0 };

	/**
	 * Update which elements are selected
	 *
	 * @param clickedPath Which path was clicked.
	 */
	const updateSelected: UseNodesResult["updateSelected"] = (clickedPath) => {
		const newState = [...selected];
		const existingIndex = newState.findIndex((p) => p.id === clickedPath.id);
		if (existingIndex > -1) {
			newState.splice(existingIndex, 1);
		} else {
			newState.push(clickedPath);
		}
		setSelected(newState);
	};
	return { selected, updateSelected, node: root };
}
