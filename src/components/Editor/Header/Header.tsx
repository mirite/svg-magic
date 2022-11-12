import React from 'react';
import styles from './Header.module.css';

import { ChangeOptions } from 'types';
import { prefixClasses, stripData, stripIDs } from 'helpers/transformers';

interface IProps {
	workingSVG: string;
	onClose: () => void;
	onChange: (changeOptions: ChangeOptions) => void;
}

function Header(props: IProps) {
	const { workingSVG, onChange, onClose } = props;
	const saveFile = () => {
		const element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(workingSVG)
		);
		element.setAttribute('download', 'magic.svg');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	};
	return (
		<header className={styles.header}>
			<h1>SVG Magic</h1>
			<div className={styles.actions}>
				<button onClick={() => onChange(prefixClasses)}>
					Prefix Classes
				</button>
				<button onClick={() => onChange(stripIDs)}>Strip IDs</button>
				<button onClick={() => onChange(stripData)}>Strip Data</button>
				<button className="positive" onClick={() => saveFile()}>
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
