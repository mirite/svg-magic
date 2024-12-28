import Path from "./Path.js";

import type { UseNodesResult } from "@/helpers/useNodes.js";
import type { DependentPaneComponent } from "@/types.js";

/**
 * A list of the elements in the SVG
 *
 * @param props The component props.
 * @returns The component.
 */
const PathList: DependentPaneComponent<UseNodesResult> = (props) => {
	const { children } = props.additional.node;

	return (
		<ul>
			{children.map((path, i) => (
				<Path
					key={`${path.name}-${i}`}
					{...props}
					additional={{ ...props.additional, node: path }}
				/>
			))}
		</ul>
	);
};

export default PathList;
