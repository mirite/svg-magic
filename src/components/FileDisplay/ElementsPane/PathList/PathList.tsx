import React from 'react';
import Path from './Path/Path';
import {ChangeOptions, IPath, SVGSubElement} from 'types';
import {useDrop} from 'react-dnd';

interface IProps {
	node: IPath,
	onChange: (options: ChangeOptions) => void;
}

function PathList(props: IProps) {
	const {children, elem} = props.node;
	const [, drop] = useDrop(() => ({
		accept: 'element',
		drop(_item: { elem: SVGSubElement }) {
			const options: ChangeOptions = {
				type: "move",
				options: {
					element: _item.elem,
					target: elem
				}
			}
			props.onChange(options);
		},
	}));

	return (
		<ul ref={drop}>
			{children.map((path, i) => (
				<Path key={i} {...path} onChange={(e) => props.onChange(e)}/>
			))}
		</ul>
	);
}

export default PathList;
