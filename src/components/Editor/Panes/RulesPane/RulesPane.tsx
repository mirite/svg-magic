import React from 'react';
import SVGClass from './SVGRule/SVGRule';
import { ChangeOptions, ISVGRule } from 'types';
import styles from './RulesPane.module.css';
import ClassList from './SVGRule/ClassList/ClassList';

interface IProps {
	classes: string[];
	rules: ISVGRule[];
	onChange: (changeOptions: ChangeOptions) => void;
}

function RulesPane(props: IProps) {
	return (
		<div>
			<ClassList
				classes={props.classes}
				onChange={(e) => props.onChange(e)}
			/>
			<h2>Rules</h2>
			<ul className={styles.ruleList}>
				{props.rules.map((c, i) => (
					<SVGClass key={i} {...c} />
				))}
			</ul>
		</div>
	);
}

export default RulesPane;
