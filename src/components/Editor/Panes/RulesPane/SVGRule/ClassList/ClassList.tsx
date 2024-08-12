import React from "react";
import type { ChangeOperation } from "types";

import Class from "./Class/Class";

interface IProps {
	classes: string[];
	onChange: (changeOptions: ChangeOperation) => void;
}

/** @param props */
function ClassList(props: IProps) {
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
