import type { FileProps, IPath } from "@/lib/types.js";

import { getSVGChildren } from "./getSVGChildren.js";
import { getSVGElement } from "./getSVGElement.js";

export type UseNodesResult = {
	node: IPath;
	updateSelected: (clickedPath: number) => void;
};

/**
 * Get the nodes from the SVG element.
 *
 * @param props The component props.
 * @returns The nodes with selected state.
 */
export function useNodes(props: FileProps): UseNodesResult {
	const svgRoot = getSVGElement(props);
	const children = getSVGChildren(svgRoot);

	const root: IPath = { children, elem: svgRoot, id: 0, name: "root" };

	/**
	 * Update which elements are selected
	 *
	 * @param clickedPath Which path was clicked.
	 */
	const updateSelected: UseNodesResult["updateSelected"] = (clickedPath) => {
		// Note: Since the setState here is wrapped in useEditor, we don't need the newState here to be a new reference
		const [newState, setState] = props.stateTuple;
		const existingIndex = newState.selected.findIndex((p) => p === clickedPath);
		if (existingIndex > -1) {
			newState.selected.splice(existingIndex, 1);
		} else {
			newState.selected.push(clickedPath);
		}
		setState(newState);
	};
	return { node: root, updateSelected };
}
