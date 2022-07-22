import React from 'react';
import Path from "./Path/Path";
import {IPath} from "../../../types";

function PathList(props: { items: IPath[] }) {
	return (
		<ul>{props.items.map((path, i) => <Path key={i} {...path}/>)}</ul>
	);
}

export default PathList;
