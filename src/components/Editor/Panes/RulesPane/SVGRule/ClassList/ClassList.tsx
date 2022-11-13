import React from 'react';
import { ChangeOperation } from 'types';
import Class from './Class/Class';

interface IProps {
	classes: string[];
	onChange: (changeOptions: ChangeOperation) => void;
}

function ClassList(props: IProps) {
	return (
		<div>
			<h2>Classes</h2>
			<ul>
				{props.classes.map((c, i) => (
					<Class
						key={i}
						name={c}
						onChange={(e) => props.onChange(e)}
					/>
				))}
			</ul>
		</div>
	);
}

export default ClassList;
