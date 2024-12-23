import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ChangeOperation, IPath } from "types";

import { paneStyles } from "../paneStyles";

import AddGroup from "./AddGroup/AddGroup";
import AssignClass from "./AssignClass/AssignClass";
import PathList from "./PathList/PathList";
import PrefixClasses from "./PrefixClasses/PrefixClasses";

interface IProps {
	svgRoot: SVGElement | undefined | null;
	paths: IPath[];
	onChange: (changeOptions: ChangeOperation) => void;
	classes: string[];
}

/** @param props */
function ElementsPane(props: IProps) {
	const { svgRoot, paths, classes } = props;

	const [selected, setSelected] = useState<IPath[]>([]);
	if (!svgRoot) {
		return <div>SVG Root Element Not Found</div>;
	}
	const rootNode: IPath = { name: "root", elem: svgRoot, children: paths };

	/**
	 * @param e
	 * @param clickedPath
	 */
	function updateSelected(
		e: React.ChangeEvent<HTMLInputElement>,
		clickedPath: IPath,
	) {
		const old = [...selected].filter((path) => path.elem !== clickedPath.elem);
		if (e.currentTarget.checked) {
			old.push(clickedPath);
		}
		setSelected(old);
	}

	const handleChangeOption = (e: ChangeOperation) => {
		props.onChange(e);
		setSelected([]);
	};

	return (
		<div className={paneStyles}>
			<h2>Elements</h2>
			<div className="group">
				<h3>Tree:</h3>
				<DndProvider backend={HTML5Backend}>
					<PathList
						node={rootNode}
						onChange={(e: ChangeOperation) => handleChangeOption(e)}
						onCheck={(e: ChangeEvent<HTMLInputElement>, p: IPath) =>
							updateSelected(e, p)
						}
						selected={selected}
					/>
				</DndProvider>
			</div>
			<AssignClass
				selected={selected}
				onChange={(e: ChangeOperation) => handleChangeOption(e)}
				classes={classes}
			/>
			<AddGroup
				onChange={(e: ChangeOperation) => handleChangeOption(e)}
				selected={selected}
			/>
			<PrefixClasses onChange={(e: ChangeOperation) => handleChangeOption(e)} />
		</div>
	);
}

export default ElementsPane;
