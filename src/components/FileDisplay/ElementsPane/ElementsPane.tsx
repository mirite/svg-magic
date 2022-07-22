import React from 'react';
import PathList from './PathList/PathList';
import {ChangeOptions, IPath} from 'types';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import AddGroup from "./AddGroup/AddGroup";

interface IProps {
	svgRoot: SVGElement | undefined | null;
	paths: IPath[];
	onChange: (changeOptions: ChangeOptions) => void;
}

function ElementsPane(props: IProps) {
	const {svgRoot, paths} = props;

	if (!svgRoot) {
		return <div>SVG Root Element Not Found</div>
	}

	const rootNode: IPath = {name: 'root', elem: svgRoot, children: paths};

	return (
		<div>
			<h2>Elements</h2>
			<DndProvider backend={HTML5Backend}>
				<PathList node={rootNode} onChange={(e: ChangeOptions) => props.onChange(e)}/>
			</DndProvider>
			<AddGroup onChange={(e: ChangeOptions) => props.onChange(e)}/>
		</div>
	);
}

export default ElementsPane;
