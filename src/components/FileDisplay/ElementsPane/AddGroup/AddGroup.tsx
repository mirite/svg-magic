import React, {useEffect, useState} from 'react';
import {IGroupOptions, IPath} from 'types';

interface IProps {
	onChange: (changeOptions: IGroupOptions) => void;
	selected?: IPath[];
}

function AddGroup(props: IProps) {
	const createOptions = (): IGroupOptions => {
		return {
			type: 'group',
			options: {
				className,
				selectedItems: selected,
			},
		};
	};

	const {selected, onChange} = props;
	const [className, setClassName] = useState('');
	const [options, setOptions] = useState<IGroupOptions>(createOptions())


	useEffect(()=>setOptions(createOptions()),[props.selected, className])

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
			<button onClick={() => onChange(options)}>Add</button>
		</div>
	);
}

export default AddGroup;
