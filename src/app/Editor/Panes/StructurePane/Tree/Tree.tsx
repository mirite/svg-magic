import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { PaneSubComponent } from "@/lib/types.js";

import Group from "@/app/shared/Group.js";
import { useNodes } from "@/lib/useNodes.js";

import AddGroup from "./AddGroup.js";
import AssignClass from "./AssignClass.js";
import PathList from "./PathList/PathList.js";

/**
 * The DOM tree of the SVG element
 *
 * @param props The props for the component.
 * @returns The component.
 */
export const Tree: PaneSubComponent = (props) => {
	const useNodesResult = useNodes(props);

	return (
		<Group>
			<h3>Tree:</h3>
			<DndProvider backend={HTML5Backend}>
				<PathList {...props} additional={useNodesResult} />
			</DndProvider>
			{props.stateTuple[0].selected.length > 0 && <AssignClass {...props} />}
			<AddGroup {...props} />
		</Group>
	);
};
