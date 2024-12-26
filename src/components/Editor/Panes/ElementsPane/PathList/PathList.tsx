import type { ChangeEvent, ReactElement } from "react";

import Path from "./Path/Path.js";

import type { ChangeOperation, IPath } from "@/types.js";

interface IProps {
	node: IPath;
	onChange: (options: ChangeOperation) => void;
	onCheck: (e: ChangeEvent<HTMLInputElement>, p: IPath) => void;
	selected: IPath[];
}

/** @param props */
function PathList(props: IProps): ReactElement {
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
