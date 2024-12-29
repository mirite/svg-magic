import PrefixClasses from "./PrefixClasses.js";
import { Tree } from "./Tree/Tree.js";

import { Pane } from "@/app/shared/Pane.js";
import type { PaneComponent } from "@/lib/types.js";

/**
 * The pane displaying the list of elements in the SVG.
 *
 * @param props The component props.
 * @returns The component.
 */
const StructurePane: PaneComponent = (props) => {
	return (
		<Pane title={"Structure"}>
			<Tree stateTuple={props.stateTuple} />
			<PrefixClasses stateTuple={props.stateTuple} />
		</Pane>
	);
};

export default StructurePane;
