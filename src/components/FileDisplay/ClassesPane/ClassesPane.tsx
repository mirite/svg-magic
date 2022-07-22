import React from 'react';
import SVGClass from './SVGRule/SVGRule';
import { ISVGRule } from 'types';

interface IProps {
	classes: ISVGRule[];
}

function ClassesPane(props: IProps) {
	return (
		<div>
			<h2>Classes</h2>
			<ul>
				{props.classes.map((c, i) => (
					<SVGClass key={i} {...c} />
				))}
			</ul>
		</div>
	);
}

export default ClassesPane;
