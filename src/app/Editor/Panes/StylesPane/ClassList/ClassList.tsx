import type { PaneSubComponent } from "@/lib/types.js";

import Group from "@/app/shared/Group.js";
import { getClasses } from "@/lib/getClasses.js";
import { getSVGElement } from "@/lib/getSVGElement.js";
import { performChange } from "@/lib/performChange.js";

import Class from "./Class.js";

/**
 * The list of classes in the SVG element
 *
 * @param props The sub-pane props
 * @returns The component.:w
 */
const ClassList: PaneSubComponent = (props) => {
	const svg = getSVGElement(props);
	const classes = getClasses(svg);
	return (
		<Group>
			<h3>Classes:</h3>
			<ul className={"space-y-2 w-full"}>
				{classes.map((c) => (
					<li key={c}>
						<Class
							existingClassName={c}
							onChange={(e) => performChange(props, e)}
						/>
					</li>
				))}
			</ul>
		</Group>
	);
};

export default ClassList;
