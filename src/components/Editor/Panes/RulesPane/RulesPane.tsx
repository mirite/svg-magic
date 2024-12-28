import ClassList from "./SVGRule/ClassList/ClassList.js";
import SVGClass from "./SVGRule/SVGRule.js";

import { Pane } from "@/components/shared/Pane.js";
import { getCSSRules } from "@/helpers/getCSSRules.js";
import { getSVGElement } from "@/helpers/getSVGElement.js";
import type { PaneComponent } from "@/types.js";

/**
 * The pane for displaying CSS rules and declarations.
 *
 * @param props The pane props
 * @returns The component.
 */
const RulesPane: PaneComponent = (props) => {
	const svg = getSVGElement(props);
	const rules = getCSSRules(svg);
	return (
		<Pane>
			<ClassList stateTuple={props.stateTuple} />
			<h2>Rules</h2>
			<ul className={"m-0 p-0"}>
				{rules.map((c) => (
					<SVGClass key={JSON.stringify(c)} {...c} />
				))}
			</ul>
		</Pane>
	);
};

export default RulesPane;
