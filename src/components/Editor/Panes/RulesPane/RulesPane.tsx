import styles from "./RulesPane.module.css";
import ClassList from "./SVGRule/ClassList/ClassList.js";
import SVGClass from "./SVGRule/SVGRule.js";

import { Pane } from "@/components/shared/Pane.js";
import type { PaneComponent } from "@/types.js";

/**
 * The pane for displaying CSS rules and declarations.
 *
 * @param props The pane props
 * @returns The component.
 */
const RulesPane: PaneComponent = (props) => {
	const state = props.stateTuple[0];
	return (
		<Pane>
			<ClassList classes={state.classes} onChange={(e) => state.onChange(e)} />
			<h2>Rules</h2>
			<ul className={styles.ruleList}>
				{state.rules.map((c, i) => (
					<SVGClass key={i} {...c} />
				))}
			</ul>
		</Pane>
	);
};

export default RulesPane;
