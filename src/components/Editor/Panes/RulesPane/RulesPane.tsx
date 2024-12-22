import { Pane } from "components/shared/Pane";
import React from "react";
import type { ChangeOperation, ISVGRule } from "types";

import styles from "./RulesPane.module.css";
import ClassList from "./SVGRule/ClassList/ClassList";
import SVGClass from "./SVGRule/SVGRule";

interface IProps {
	classes: string[];
	rules: ISVGRule[];
	onChange: (changeOptions: ChangeOperation) => void;
}

/** @param props */
function RulesPane(props: IProps) {
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
