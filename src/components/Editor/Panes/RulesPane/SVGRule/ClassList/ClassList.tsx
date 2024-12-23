import type { ReactElement } from "react";

import Class from "./Class/Class.js";

import type { ChangeOperation } from "@/types.js";

interface IProps {
	classes: string[];
	onChange: (changeOptions: ChangeOperation) => void;
}

/** @param props */
function ClassList(props: IProps): ReactElement {
	return (
		<div>
			<h2>Classes</h2>
			<ul>
				{props.classes.map((c, i) => (
					<Class key={i} name={c} onChange={(e) => props.onChange(e)} />
				))}
			</ul>
		</div>
	);
}

export default ClassList;
