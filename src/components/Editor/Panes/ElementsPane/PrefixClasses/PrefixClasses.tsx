import React, { FormEvent, useState } from 'react';
import { ChangeOperation, IPrefixClassOptions } from 'types';
import { prefixClasses } from 'helpers/transformers';

interface IProps {
	onChange: (options: ChangeOperation) => void;
}

const PrefixClasses = (props: IProps) => {
	const { onChange } = props;
	const [prefix, setPrefix] = useState('');

	const options: IPrefixClassOptions = {
		prefix,
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onChange((elem) => prefixClasses(elem, options));
		setPrefix('');
	};

	return (
		<form className="group" onSubmit={(e) => handleSubmit(e)}>
			<h3>Prefix Classes:</h3>
			<label htmlFor="assign-class-name">
				Prefix:
				<input
					id="assign-class-name"
					type="text"
					required
					value={prefix}
					onChange={(e) => setPrefix(e.currentTarget.value)}
				/>
			</label>
			<button disabled={prefix === ''}>Add Prefix</button>
		</form>
	);
};

export default PrefixClasses;
