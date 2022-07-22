import React from 'react';
import Path from './Path/Path';
import { ChangeOptions, IPath } from 'types';

interface IProps {
	node: IPath;
	onChange: (options: ChangeOptions) => void;
}

function PathList(props: IProps) {
	const { children, elem } = props.node;

	return (
		<ul>
			{children.map((path, i) => (
				<Path key={i} {...path} onChange={(e) => props.onChange(e)} />
			))}
		</ul>
	);
}

export default PathList;
