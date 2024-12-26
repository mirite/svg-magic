import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddGroup from "./AddGroup/AddGroup.js";
import AssignClass from "./AssignClass/AssignClass.js";
import PathList from "./PathList/PathList.js";
import PrefixClasses from "./PrefixClasses/PrefixClasses.js";

import { Pane } from "@/components/shared/Pane.js";
import type { ChangeOperation, IPath, PaneComponent } from "@/types.js";

/**
 * The pane displaying the list of elements in the SVG.
 *
 * @param props The component props.
 * @returns The component.
 */
const ElementsPane: PaneComponent = (props) => {
	const { paths, classes, onChange, svgContainer } = props.stateTuple[0];

	const [selected, setSelected] = useState<IPath[]>([]);
	const svgRoot = svgContainer?.querySelector("svg");
	if (!svgRoot) {
		return <div>SVG Root Element Not Found</div>;
	}

	const rootNode: IPath = { name: "root", elem: svgRoot, children: paths };

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
		onChange(e);
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
