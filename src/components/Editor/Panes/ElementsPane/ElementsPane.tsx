import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddGroup from "./AddGroup/AddGroup.js";
import AssignClass from "./AssignClass/AssignClass.js";
import PathList from "./PathList/PathList.js";
import PrefixClasses from "./PrefixClasses/PrefixClasses.js";

import { Pane } from "@/components/shared/Pane.js";
import { getSVGElement } from "@/helpers/getSVGElement.js";
import { findClasses, findSVGChildren } from "@/helpers/parsers.js";
import { performChange } from "@/helpers/transformer.js";
import type { ChangeOperation, IPath, PaneComponent } from "@/types.js";

/**
 * The pane displaying the list of elements in the SVG.
 *
 * @param props The component props.
 * @returns The component.
 */
const ElementsPane: PaneComponent = (props) => {
	const [selected, setSelected] = useState<IPath[]>([]);
	const svgRoot = getSVGElement(props);
	if (!svgRoot) {
		return null;
	}
	const children = findSVGChildren(svgRoot);
	const classes = findClasses(svgRoot);
	const rootNode: IPath = { name: "root", elem: svgRoot, children };

	/**
	 * Update which elements are selected
	 *
	 * @param e The change event from the checkbox
	 * @param clickedPath Which path was clicked.
	 */
	function updateSelected(
		e: React.ChangeEvent<HTMLInputElement>,
		clickedPath: IPath,
	) {
		const old = [...selected].filter((path) => path.elem !== clickedPath.elem);
		if (e.currentTarget.checked) {
			old.push(clickedPath);
		}
		setSelected(old);
	}

	const handleChangeOption = (e: ChangeOperation) => {
		performChange(props, e);
		setSelected([]);
	};

	return (
		<Pane>
			<h2>Elements</h2>
			<div className="group">
				<h3>Tree:</h3>
				<DndProvider backend={HTML5Backend}>
					<PathList
						node={rootNode}
						onChange={(e: ChangeOperation) => handleChangeOption(e)}
						onCheck={(e: ChangeEvent<HTMLInputElement>, p: IPath) =>
							updateSelected(e, p)
						}
						selected={selected}
					/>
				</DndProvider>
			</div>
			<AssignClass
				selected={selected}
				onChange={(e: ChangeOperation) => handleChangeOption(e)}
				classes={classes}
			/>
			<AddGroup
				onChange={(e: ChangeOperation) => handleChangeOption(e)}
				selected={selected}
			/>
			<PrefixClasses onChange={(e: ChangeOperation) => handleChangeOption(e)} />
		</Pane>
	);
};

export default ElementsPane;
