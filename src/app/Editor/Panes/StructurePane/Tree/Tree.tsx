import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddGroup from "./AddGroup.js";
import AssignClass from "./AssignClass.js";
import PathList from "./PathList/PathList.js";

import Group from "@/app/shared/Group.js";
import type { PaneSubComponent } from "@/lib/types.js";
import { useNodes } from "@/lib/useNodes.js";

/**
 * The DOM tree of the SVG element
 *
 * @param props The props for the component.
 * @returns The component.
 */
export const Tree: PaneSubComponent = (props) => {
	const useNodesResult = useNodes(props);
	const { selected } = useNodesResult;
	return (
		<Group>
			<h3>Tree:</h3>
			<DndProvider backend={HTML5Backend}>
				<PathList {...props} additional={useNodesResult} />
			</DndProvider>
			{selected.length > 0 && (
				<AssignClass {...props} additional={{ selected }} />
			)}
			<AddGroup {...props} additional={{ selected }} />
		</Group>
	);
};
