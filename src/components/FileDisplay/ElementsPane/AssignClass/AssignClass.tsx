import React, {useState} from 'react';
import {IAssignClassOptions, IPath} from "types";

interface IProps {
	selected: IPath[];
	onChange: (options: IAssignClassOptions) => void;
}

function AssignClass(props: IProps) {
	const [className, setClassName] = useState('');
	const options: IAssignClassOptions = {
		type: "assign",
		options: {
			className,
			selectedItems: props.selected
		}
	}
	return (
		<div className="group">
			Assign Class
			<label>
				Class:
				<input
					type="text"
					value={className}
					onChange={(e) => setClassName(e.currentTarget.value)}
				/>
			</label>
			<button onClick={() => props.onChange(options)}>Assign</button>
		</div>
	);
}

export default AssignClass;
