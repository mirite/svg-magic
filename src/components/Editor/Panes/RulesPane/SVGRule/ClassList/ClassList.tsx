import Class from "./Class/Class.js";

import { getSVGElement } from "@/helpers/getSVGElement.js";
import { findClasses } from "@/helpers/parsers.js";
import type { PaneSubComponent } from "@/types.js";

/**
 * The list of classes in the SVG element
 *
 * @param props The sub-pane props
 * @returns The component.:w
 */
const ClassList: PaneSubComponent = (props) => {
	const classes = findClasses(getSVGElement(props));
	return (
		<div>
			<h2>Classes</h2>
			<ul>
				{classes.map((c, i) => (
					<Class
						key={i}
						name={c}
						onChange={(e) => props.stateTuple[0].onChange(e)}
					/>
				))}
			</ul>
		</div>
	);
};

export default ClassList;
