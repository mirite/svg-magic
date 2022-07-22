import React from 'react';
import PathList from './PathList/PathList';
import { IPath } from 'types';

interface IProps {
	paths: IPath[];
}

function ElementsPane(props: IProps) {
	return (
		<div>
			<h2>Elements</h2>
			<PathList items={props.paths} />
		</div>
	);
}

export default ElementsPane;
