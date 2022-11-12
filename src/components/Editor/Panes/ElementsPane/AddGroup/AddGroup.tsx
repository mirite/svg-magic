import React, { useEffect, useState } from 'react';
import { ChangeOperation, IGroupOptions, IPath } from 'types';
import { addGroup } from '../../../../../helpers/transformers';

interface IProps {
	onChange: (changeOptions: ChangeOperation<IGroupOptions>) => void;
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

	const { selected, onChange } = props;
	const [className, setClassName] = useState('');
	const [options, setOptions] = useState<IGroupOptions>(createOptions());

	useEffect(() => setOptions(createOptions()), [props.selected, className]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onChange({
			func: addGroup,
			options,
		});
		setClassName('');
	}

	return (
		<form className="group" onSubmit={(e) => handleSubmit(e)}>
			<h3>Add Group:</h3>
			<label>
				Class:
				<input
					type="text"
					value={className}
					onChange={(e) => setClassName(e.currentTarget.value)}
				/>
			</label>
			<button>Add</button>
		</form>
	);
}

export default AddGroup;
