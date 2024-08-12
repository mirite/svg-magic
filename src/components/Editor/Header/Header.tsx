import { saveFile } from "helpers/fileSaving";
import { prefixClasses, stripData, stripIDs } from "helpers/transformers";
import React from "react";
import type { ChangeOperation } from "types";

import { inlineStyles } from "../../../helpers/transformers/inlineStyles";
import { stripClasses } from "../../../helpers/transformers/stripClasses";

import styles from "./Header.module.css";

interface IProps {
	workingSVG: string;
	fileName: string;
	onClose: () => void;
	onChange: (changeOptions: ChangeOperation) => void;
}

/** @param props */
function Header(props: IProps) {
	const { workingSVG, onChange, onClose, fileName } = props;

	return (
		<header className={styles.header}>
			<h1>SVG Magic</h1>
			<div className={styles.actions}>
				<button onClick={() => onChange(inlineStyles)}>Inline Styles</button>
				<button onClick={() => onChange(prefixClasses)}>Prefix Classes</button>
				<button onClick={() => onChange(stripIDs)}>Strip IDs</button>
				<button onClick={() => onChange(stripClasses)}>Strip Classes</button>
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
