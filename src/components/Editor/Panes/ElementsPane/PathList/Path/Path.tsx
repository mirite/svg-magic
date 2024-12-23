import type { ChangeEvent, ReactElement } from "react";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

import PathList from "../PathList.js";

import styles from "./Path.module.css";

import { moveElement } from "@/helpers/transformers/index.js";
import type {
	ChangeOperation,
	IMoveOptions,
	IPath,
	SVGSubElement,
} from "@/types.js";

interface IProps extends IPath {
	onChange: (options: ChangeOperation) => void;
	onCheck: (e: ChangeEvent<HTMLInputElement>, p: IPath) => void;
	selected: IPath[];
}

/**
 * Displays a path in the elements list.
 *
 * @param props The data about the path.
 * @returns The component.
 */
function Path(props: IProps): ReactElement {
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
				<div>
					{drag(
						<label className={styles.label}>
							<input
								type="checkbox"
								onChange={(e) => handleChange(e)}
								checked={!!selected.find((s) => s.elem === elem)}
							/>
							{name}
						</label>,
					)}
				</div>,
			)}
			{children.length ? (
				<PathList
					node={props}
					onChange={(e) => props.onChange(e)}
					onCheck={(e, p: IPath) => props.onCheck(e, p)}
					selected={props.selected}
				/>
			) : (
				""
			)}
		</li>
	);
}

export default Path;
