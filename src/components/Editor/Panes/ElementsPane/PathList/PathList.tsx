import type { ReactElement } from "react";

import Path, { type PathProps } from "./Path.js";

import type { IPath } from "@/types.js";

export type PathListProps = {
	node: IPath;
} & Pick<PathProps, "onChange" | "onCheck" | "selected">;

/**
 * A list of the elements in the SVG
 *
 * @param props The component props.
 * @returns The component.
 */
function PathList(props: PathListProps): ReactElement {
	const { children } = props.node;

	return (
		<ul>
			{children.map((path, i) => (
				<Path
					key={`${path.name}-${i}`}
					onChange={props.onChange}
					selected={props.selected}
					onCheck={props.onCheck}
					{...path}
				/>
			))}
		</ul>
	);
}

export default PathList;
