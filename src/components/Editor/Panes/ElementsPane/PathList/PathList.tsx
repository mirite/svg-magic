import type { ChangeEvent } from "react";
import React from "react";
import type { ChangeOperation, IPath } from "types";

import Path from "./Path/Path";

interface IProps {
	node: IPath;
	onChange: (options: ChangeOperation) => void;
	onCheck: (e: ChangeEvent<HTMLInputElement>, p: IPath) => void;
	selected: IPath[];
}

/** @param props */
function PathList(props: IProps) {
	const { children } = props.node;

	return (
		<ul>
			{children.map((path, i) => (
				<Path
					key={i}
					onChange={(e) => props.onChange(e)}
					selected={props.selected}
					onCheck={(e: ChangeEvent<HTMLInputElement>, p: IPath) =>
						props.onCheck(e, p)
					}
					{...path}
				/>
			))}
		</ul>
	);
}

export default PathList;
