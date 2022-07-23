import React from 'react';
import SVGClass from './SVGRule/SVGRule';
import { ISVGRule } from 'types';
import styles from "./RulesPane.module.css";

interface IProps {
	classes: ISVGRule[];
}

function RulesPane(props: IProps) {
	return (
		<div>
			<h2>Rules</h2>
			<ul className={styles.ruleList}>
				{props.classes.map((c, i) => (
					<SVGClass key={i} {...c} />
				))}
			</ul>
		</div>
	);
}

export default RulesPane;
