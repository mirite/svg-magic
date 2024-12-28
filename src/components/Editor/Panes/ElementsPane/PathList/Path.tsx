import type { ChangeEvent, ReactElement } from "react";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

import PathList from "./PathList.js";

import { Checkbox } from "@/components/shared/CheckBox.js";
import { moveElement } from "@/helpers/transformers/index.js";
import type {
	ChangeOperation,
	IMoveOptions,
	IPath,
	SVGSubElement,
} from "@/types.js";

export type PathProps = IPath & {
	onChange: (options: ChangeOperation) => void;
	onCheck: (e: ChangeEvent<HTMLInputElement>, p: IPath) => void;
	selected: IPath[];
};

/**
 * Displays a path in the elements list.
 *
 * @param props The data about the path.
 * @returns The component.
 */
function Path(props: PathProps): ReactElement {
	const { elem, name, children, selected } = props;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		elem.classList.toggle("active", e.currentTarget.checked);
		props.onCheck(e, { elem, name, children });
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
				props.onChange(() => moveElement(elem, options));
			},
		}),
		[props.elem],
	);

	return (
		<li style={{ opacity }}>
			{drop(
				drag(
					<div>
						<Checkbox
							label={name}
							onChange={(e) => handleChange(e)}
							checked={
								!!selected.find((s) => s.elem.outerHTML === elem.outerHTML)
							}
						/>
					</div>,
				),
			)}
			{children.length > 0 && (
				<PathList
					node={props}
					onChange={(e) => props.onChange(e)}
					onCheck={(e, p: IPath) => props.onCheck(e, p)}
					selected={props.selected}
				/>
			)}
		</li>
	);
}

export default Path;
