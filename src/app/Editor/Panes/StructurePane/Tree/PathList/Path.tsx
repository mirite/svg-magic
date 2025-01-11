import React from "react";
import { useDrag, useDrop } from "react-dnd";

import { performChange } from "@/lib/performChange.js";
import type { IMoveOptions } from "@/lib/transformers/index.js";
import { moveElement } from "@/lib/transformers/index.js";
import type { DependentPaneComponent, IPath } from "@/lib/types.js";
import type { UseNodesResult } from "@/lib/useNodes.js";

import PathList from "./PathList.js";

import { Checkbox } from "@/app/shared/CheckBox.js";

/**
 * Displays a path in the elements list.
 *
 * @param props The data about the path.
 * @returns The component.
 */
const Path: DependentPaneComponent<UseNodesResult & { node: IPath }> = (
	props,
) => {
	const { additional, stateTuple } = props;
	const { updateSelected, node } = additional;
	const { selected } = stateTuple[0];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		node.elem.classList.toggle("active", e.currentTarget.checked);
		updateSelected(node.id);
	};

	const [, drag] = useDrag<IPath>(
		() => ({
			type: "element",
			item: node,
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
		}),
		[],
	);

	const [, drop] = useDrop<IPath>(
		() => ({
			accept: "element",
			drop(item) {
				const { id: elementBeingDropped } = item;

				if (elementBeingDropped === node.id) return;

				const options: IMoveOptions = {
					element: elementBeingDropped,
					target: node.id,
				};
				performChange(props, (elem) => moveElement(elem, options));
			},
		}),
		[],
	);

	return (
		<li>
			{drop(
				drag(
					<div data-testid={`node-${node.id}`}>
						<Checkbox
							label={node.name}
							onChange={(e) => handleChange(e)}
							checked={!!selected.find((s) => s === node.id)}
						/>
					</div>,
				),
			)}
			{node.children.length > 0 && (
				<PathList {...props} additional={{ ...props.additional, node }} />
			)}
		</li>
	);
};

export default Path;
