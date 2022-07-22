import React, {ChangeEvent} from 'react';
import Path from './Path/Path';
import {ChangeOptions, IPath} from 'types';

interface IProps {
	node: IPath;
	onChange: (options: ChangeOptions) => void;
	onCheck: (e: ChangeEvent<HTMLInputElement>, p: IPath) => void;
	selected: IPath[];
}

function PathList(props: IProps) {
	const {children} = props.node;

	return (
		<ul>
			{children.map((path, i) => (
				<Path
					key={i}
					onChange={(e) => props.onChange(e)}
					selected={props.selected}
					onCheck={(e: ChangeEvent<HTMLInputElement>, p:IPath) => props.onCheck(e, p)}
					{...path}
				/>
			))}
		</ul>
	);
}

export default PathList;
