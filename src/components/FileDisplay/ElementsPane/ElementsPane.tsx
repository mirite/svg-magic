import React, { ChangeEvent, useState } from 'react';
import PathList from './PathList/PathList';
import { ChangeOptions, IPath } from 'types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddGroup from './AddGroup/AddGroup';
import AssignClass from './AssignClass/AssignClass';

interface IProps {
	svgRoot: SVGElement | undefined | null;
	paths: IPath[];
	onChange: (changeOptions: ChangeOptions) => void;
}

function ElementsPane(props: IProps) {
	const { svgRoot, paths } = props;

	const [selected, setSelected] = useState<IPath[]>([]);
	if (!svgRoot) {
		return <div>SVG Root Element Not Found</div>;
	}
	const rootNode: IPath = { name: 'root', elem: svgRoot, children: paths };

	function updateSelected(
		e: React.ChangeEvent<HTMLInputElement>,
		clickedPath: IPath
	) {
		const old = [...selected].filter(
			(path) => path.elem !== clickedPath.elem
		);
		if (e.currentTarget.checked) {
			old.push(clickedPath);
		}
		setSelected(old);
	}

	const handleChangeOption = (e: ChangeOptions) => {
		props.onChange(e);
		setSelected([]);
	};

	return (
		<div>
			<h2>Elements</h2>
			<div className="group">
				<h3>Tree:</h3>
				<DndProvider backend={HTML5Backend}>
					<PathList
						node={rootNode}
						onChange={(e: ChangeOptions) => handleChangeOption(e)}
						onCheck={(e: ChangeEvent<HTMLInputElement>, p: IPath) =>
							updateSelected(e, p)
						}
						selected={selected}
					/>
				</DndProvider>
			</div>
			<AssignClass
				selected={selected}
				onChange={(e: ChangeOptions) => handleChangeOption(e)}
			/>
			<AddGroup
				onChange={(e: ChangeOptions) => handleChangeOption(e)}
				selected={selected}
			/>
		</div>
	);
}

export default ElementsPane;
