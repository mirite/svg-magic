import React from 'react';
import styles from './Header.module.css';

import { ChangeOperation } from 'types';
import { prefixClasses, stripData, stripIDs } from 'helpers/transformers';
import { saveFile } from 'helpers/fileSaving';

interface IProps {
	workingSVG: string;
	fileName: string;
	onClose: () => void;
	onChange: (changeOptions: ChangeOperation) => void;
}

function Header(props: IProps) {
	const { workingSVG, onChange, onClose, fileName } = props;

	return (
		<header className={styles.header}>
			<h1>SVG Magic</h1>
			<div className={styles.actions}>
				<button onClick={() => onChange(stripIDs)}>
					Inlining Styles
				</button>
				<button onClick={() => onChange(prefixClasses)}>
					Prefix Classes
				</button>
				<button onClick={() => onChange(stripIDs)}>Strip IDs</button>
				<button onClick={() => onChange(stripData)}>Strip Data</button>
				<button
					className="positive"
					onClick={() => saveFile(workingSVG, fileName)}
				>
					Save
				</button>
				<button className="destructive" onClick={() => onClose()}>
					Close
				</button>
			</div>
		</header>
	);
}

export default Header;
