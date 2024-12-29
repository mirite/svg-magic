import type { UseNodesResult } from "@/lib/useNodes.js";
import type { DependentPaneComponent } from "@/lib/types.js";

import Path from "./Path.js";

/**
 * A list of the elements in the SVG
 *
 * @param props The component props.
 * @returns The component.
 */
const PathList: DependentPaneComponent<UseNodesResult> = (props) => {
	const { children } = props.additional.node;

	return (
		<ul data-testid={"path-list"}>
			{children.map((path) => (
				<Path
					key={`${path.id}`}
					{...props}
					additional={{ ...props.additional, node: path }}
				/>
			))}
		</ul>
	);
};

export default PathList;
