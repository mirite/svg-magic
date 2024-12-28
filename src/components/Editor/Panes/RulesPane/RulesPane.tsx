import styles from "./RulesPane.module.css";
import ClassList from "./SVGRule/ClassList/ClassList.js";
import SVGClass from "./SVGRule/SVGRule.js";

import { Pane } from "@/components/shared/Pane.js";
import { getSVGElement } from "@/helpers/getSVGElement.js";
import { findSVGRules } from "@/helpers/parsers.js";
import type { PaneComponent } from "@/types.js";

/**
 * The pane for displaying CSS rules and declarations.
 *
 * @param props The pane props
 * @returns The component.
 */
const RulesPane: PaneComponent = (props) => {
	const svg = getSVGElement(props);
	const rules = findSVGRules(svg);
	return (
		<Pane>
			<ClassList stateTuple={props.stateTuple} />
			<h2>Rules</h2>
			<ul className={styles.ruleList}>
				{rules.map((c) => (
					<SVGClass key={c.id} {...c} />
				))}
			</ul>
		</Pane>
	);
};

export default RulesPane;
