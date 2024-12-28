import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddGroup from "./AddGroup.js";
import AssignClass from "./AssignClass.js";
import type { PathProps } from "./PathList/Path.js";
import PathList from "./PathList/PathList.js";

import Group from "@/components/shared/Group.js";
import { getClasses } from "@/helpers/getClasses.js";
import { getSVGChildren } from "@/helpers/getSVGChildren.js";
import { getSVGElement } from "@/helpers/getSVGElement.js";
import { performChange } from "@/helpers/performChange.js";
import type { PaneSubComponent, ChangeOperation, IPath } from "@/types.js";

/**
 * The DOM tree of the SVG element
 *
 * @param props The props for the component.
 * @returns The component.
 */
export const Tree: PaneSubComponent = (props) => {
	const [selected, setSelected] = useState<IPath[]>([]);
	const svgRoot = getSVGElement(props);
	const children = getSVGChildren(svgRoot);
	const classes = getClasses(svgRoot);
	const rootNode: IPath = { name: "root", elem: svgRoot, children };

	/**
	 * Update which elements are selected
	 *
	 * @param e The change event from the checkbox
	 * @param clickedPath Which path was clicked.
	 */
	const updateSelected: PathProps["onCheck"] = (e, clickedPath) => {
		const newState = [...selected];
		console.log({ e, clickedPath });
		// TODO: Need a way to uniquely identify each node now that they aren't references to the original objects.
		setSelected(newState);
	};

	const handleChangeOption: PathProps["onChange"] = (e: ChangeOperation) => {
		performChange(props, e);
	};

	return (
		<Group>
			<h3>Tree:</h3>
			<DndProvider backend={HTML5Backend}>
				<PathList
					node={rootNode}
					onChange={(e) => handleChangeOption(e)}
					onCheck={(e, p) => updateSelected(e, p)}
					selected={selected}
				/>
			</DndProvider>
			{selected.length > 0 && (
				<AssignClass
					selected={selected}
					onChange={(e: ChangeOperation) => handleChangeOption(e)}
					classes={classes}
				/>
			)}
			<AddGroup
				onChange={(e: ChangeOperation) => handleChangeOption(e)}
				selected={selected}
			/>
		</Group>
	);
};
