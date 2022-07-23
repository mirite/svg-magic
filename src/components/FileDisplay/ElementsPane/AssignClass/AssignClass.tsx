import React, { FormEvent, useState } from 'react';
import { IAssignClassOptions, IPath } from 'types';

interface IProps {
	selected: IPath[];
	onChange: (options: IAssignClassOptions) => void;
	classes: string[];
}

function AssignClass(props: IProps) {
	const { selected: selectedItems, classes, onChange } = props;
	const [useExisting, setUseExisting] = useState(true);
	const [className, setClassName] = useState('');
	const options: IAssignClassOptions = {
		type: 'assign',
		options: {
			className,
			selectedItems,
		},
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onChange(options);
		setUseExisting(true);
		setClassName('');
	};
	return (
		<form className="group" onSubmit={(e) => handleSubmit(e)}>
			<h3>Assign Class:</h3>
			<label>
				Existing?
				<input
					type="checkbox"
					checked={useExisting}
					onChange={(e) => {
						setClassName('');
						setUseExisting(e.currentTarget.checked);
					}}
				/>
			</label>
			<label htmlFor="assign-class-name">
				Class:
				{useExisting ? (
					<select
						id="assign-class-name"
						required
						onChange={(e) => setClassName(e.currentTarget.value)}
						value={className}
					>
						<option value="">Select an Existing Class</option>
						{classes.map((c, i) => (
							<option key={i} value={c}>
								{c}
							</option>
						))}
					</select>
				) : (
					<input
						id="assign-class-name"
						type="text"
						required
						value={className}
						onChange={(e) => setClassName(e.currentTarget.value)}
					/>
				)}
			</label>
			<button disabled={selectedItems.length === 0 || className === ''}>
				Assign
			</button>
		</form>
	);
}

export default AssignClass;
