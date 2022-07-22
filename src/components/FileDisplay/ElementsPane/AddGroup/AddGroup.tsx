import React, { useState } from 'react';
import { IGroupOptions } from 'types';

interface IProps {
	onChange: (changeOptions: IGroupOptions) => void;
}

function AddGroup(props: IProps) {
	const [className, setClassName] = useState('');
	const options: IGroupOptions = {
		type: 'group',
		options: {
			className,
		},
	};

	return (
		<div className="group">
			Add Group
			<label>
				Class:
				<input
					type="text"
					value={className}
					onChange={(e) => setClassName(e.currentTarget.value)}
				/>
			</label>
			<button onClick={() => props.onChange(options)}>Add</button>
		</div>
	);
}

export default AddGroup;
