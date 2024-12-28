import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddGroup from "./AddGroup/AddGroup.js";
import AssignClass from "./AssignClass/AssignClass.js";
import type { PathProps } from "./PathList/Path/Path.js";
import PathList from "./PathList/PathList.js";
import PrefixClasses from "./PrefixClasses/PrefixClasses.js";

import { Pane } from "@/components/shared/Pane.js";
import { getSVGElement } from "@/helpers/getSVGElement.js";
import { performChange } from "@/helpers/transformer.js";
import type { ChangeOperation, IPath, PaneComponent } from "@/types.js";
import { getSVGChildren } from "@/helpers/getSVGChildren.js";
import { getClasses } from "@/helpers/getClasses.js";

/**
 * The pane displaying the list of elements in the SVG.
 *
 * @param props The component props.
 * @returns The component.
 */
const ElementsPane: PaneComponent = (props) => {
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
	 * @param _e
	 * @param _clickedPath
	 */
	const updateSelected: PathProps["onCheck"] = (_e, _clickedPath) => {
		const newState = [...selected];
		// TODO: Need a way to uniquely identify each node now that they aren't references to the original objects.
		setSelected(newState);
	};

	const handleChangeOption: PathProps["onChange"] = (e: ChangeOperation) => {
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
						onChange={(e) => handleChangeOption(e)}
						onCheck={(e, p) => updateSelected(e, p)}
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
