import type { ReactElement } from "react";

import styles from "./RulesPane.module.css";
import ClassList from "./SVGRule/ClassList/ClassList.js";
import SVGClass from "./SVGRule/SVGRule.js";

import { Pane } from "@/components/shared/Pane.js";
import type { ChangeOperation, ISVGRule } from "@/types.js";

interface IProps {
	classes: string[];
	rules: ISVGRule[];
	onChange: (changeOptions: ChangeOperation) => void;
}

/** @param props */
function RulesPane(props: IProps): ReactElement {
	return (
		<Pane>
			<ClassList classes={props.classes} onChange={(e) => props.onChange(e)} />
			<h2>Rules</h2>
			<ul className={styles.ruleList}>
				{props.rules.map((c, i) => (
					<SVGClass key={i} {...c} />
				))}
			</ul>
		</Pane>
	);
}

export default RulesPane;
