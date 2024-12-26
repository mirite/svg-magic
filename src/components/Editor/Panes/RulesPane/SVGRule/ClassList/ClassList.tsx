import Class from "./Class/Class.js";

import { getSVGElement } from "@/helpers/getSVGElement.js";
import { findClasses } from "@/helpers/parsers.js";
import { performChange } from "@/helpers/transformer.js";
import type { PaneSubComponent } from "@/types.js";

/**
 * The list of classes in the SVG element
 *
 * @param props The sub-pane props
 * @returns The component.:w
 */
const ClassList: PaneSubComponent = (props) => {
	const svg = getSVGElement(props);
	const classes = findClasses(svg);
	return (
		<div>
			<h2>Classes</h2>
			<ul>
				{classes.map((c, i) => (
					<Class key={i} name={c} onChange={(e) => performChange(props, e)} />
				))}
			</ul>
		</div>
	);
};

export default ClassList;
