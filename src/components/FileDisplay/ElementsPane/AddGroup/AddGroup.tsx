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
		<div>
			<label>
				Class:{' '}
				<input
					type="text"
					value={className}
					onChange={(e) => setClassName(e.currentTarget.value)}
				/>
			</label>
			<button onClick={() => props.onChange(options)}>Add Group</button>
		</div>
	);
}

export default AddGroup;
