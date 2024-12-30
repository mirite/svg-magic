import React from "react";
import { useDrag, useDrop } from "react-dnd";

import { Checkbox } from "@/app/shared/CheckBox.js";
import { performChange } from "@/lib/performChange.js";
import type { IMoveOptions } from "@/lib/transformers/index.js";
import { moveElement } from "@/lib/transformers/index.js";
import type {
	DependentPaneComponent,
	IPath,
	SVGSubElement,
} from "@/lib/types.js";
import type { UseNodesResult } from "@/lib/useNodes.js";

import PathList from "./PathList.js";

/**
 * Displays a path in the elements list.
 *
 * @param props The data about the path.
 * @returns The component.
 */
const Path: DependentPaneComponent<UseNodesResult & { node: IPath }> = (
	props,
) => {
	const { updateSelected, node, selected } = props.additional;
	const { elem, name, children } = node;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		elem.classList.toggle("active", e.currentTarget.checked);
		updateSelected(node);
	};

	const [{ opacity }, drag] = useDrag(
		() => ({
			type: "element",
			item: { elem },
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
		}),
		[],
	);

	const [, drop] = useDrop(
		() => ({
			accept: "element",
			drop(_item: { elem: SVGSubElement }) {
				const { elem: elementBeingDropped } = _item;
				const currentElement = elem;

				if (elementBeingDropped === currentElement) return;

				const options: IMoveOptions = {
					element: elementBeingDropped,
					target: currentElement,
				};
				performChange(props, () => moveElement(elem, options));
			},
		}),
		[elem],
	);

	return (
		<li style={{ opacity }}>
			{drop(
				drag(
					<div data-testid={`node-${node.id}`}>
						<Checkbox
							label={name}
							onChange={(e) => handleChange(e)}
							checked={!!selected.find((s) => s.id === node.id)}
						/>
					</div>,
				),
			)}
			{children.length > 0 && (
				<PathList {...props} additional={{ ...props.additional, node }} />
			)}
		</li>
	);
};

export default Path;
