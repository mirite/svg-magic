import React, { useEffect, useState } from 'react';
import styles from './Class.module.css';
import { ChangeOperation, IClassOptions } from 'types';
import { renameClass } from '../../../../../../../helpers/transformers';

interface IProps {
	name: string;
	onChange: (changeOptions: ChangeOperation<IClassOptions>) => void;
}

function Class(props: IProps) {
	const [renaming, setRenaming] = useState(false);
	const [newName, setNewName] = useState(props.name);

	function cancelRename() {
		setNewName(props.name);
		setRenaming(false);
	}

	function confirmRename() {
		const options: IClassOptions = {
			type: 'renameClass',
			options: {
				existingClassName: props.name,
				newClassName: newName,
			},
		};
		props.onChange({ func: renameClass, options });
		setRenaming(false);
	}

	function deleteClass() {
		const options: IClassOptions = {
			type: 'removeClass',
			options: {
				existingClassName: props.name,
			},
		};
		props.onChange({ func: deleteClass, options });
	}

	useEffect(() => setNewName(props.name), [props]);

	return (
		<li className={styles.className}>
			<span>
				{renaming ? (
					<input
						type="text"
						value={newName}
						onChange={(e) => setNewName(e.currentTarget.value)}
					/>
				) : (
					props.name
				)}
			</span>
			{renaming ? (
				<button onClick={() => confirmRename()}>Confirm</button>
			) : (
				<button onClick={() => setRenaming(true)}>Rename</button>
			)}
			{renaming ? (
				<button onClick={() => cancelRename()}>Cancel</button>
			) : (
				<button onClick={() => deleteClass()}>Delete</button>
			)}
		</li>
	);
}

export default Class;
