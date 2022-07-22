import React from 'react';
import {IChangeOptions, IPath} from "../../../../types";

interface IProps {
	onChange: (changeOptions: IChangeOptions) => void;
}

function AddGroup(props:IProps) {
	const options: IChangeOptions = {
		type: 'group',
	};

	return (
		<button onClick={() => props.onChange(options)}>Add Group</button>
	);
}

export default AddGroup;
