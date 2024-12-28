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

	const root: IPath = { name: "root", elem: svgRoot, children };

	/**
	 * Update which elements are selected
	 *
	 * @param clickedPath Which path was clicked.
	 */
	const updateSelected: UseNodesResult["updateSelected"] = (clickedPath) => {
		const newState = [...selected];
		console.log({ clickedPath });
		// TODO: Need a way to uniquely identify each node now that they aren't references to the original objects.
		setSelected(newState);
	};
	return { selected, updateSelected, node: root };
}
