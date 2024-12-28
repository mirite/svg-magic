import Class from "./Class/Class.js";

import { getSVGElement } from "@/helpers/getSVGElement.js";
import { performChange } from "@/helpers/transformer.js";
import type { PaneSubComponent } from "@/types.js";
import { getClasses } from "@/helpers/getClasses.js";

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
		<div>
			<h2>Classes</h2>
			<ul>
				{classes.map((c) => (
					<Class key={c} name={c} onChange={(e) => performChange(props, e)} />
				))}
			</ul>
		</div>
	);
};

export default ClassList;
