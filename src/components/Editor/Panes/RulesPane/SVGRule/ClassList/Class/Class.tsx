import React, { useEffect, useState } from 'react';
import styles from './Class.module.css';
import { ChangeOperation, IClassOptions } from 'types';
import { removeClass, renameClass } from 'helpers/transformers';

interface IProps {
	name: string;
	onChange: (changeOptions: ChangeOperation<IClassOptions>) => void;
}

function Class(props: IProps) {
	const { name, onChange } = props;
	const [renaming, setRenaming] = useState(false);
	const [newName, setNewName] = useState(name);

	function cancelRename() {
		setNewName(name);
		setRenaming(false);
	}

	function confirmRename() {
		const options: IClassOptions = {
			options: {
				existingClassName: name,
				newClassName: newName,
			},
		};
		onChange({ func: renameClass, options });
		setRenaming(false);
	}

	function deleteClass() {
		const options: IClassOptions = {
			options: {
				existingClassName: name,
			},
		};
		onChange({ func: removeClass, options });
	}

	useEffect(() => setNewName(name), [props]);

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
					name
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
