import React, { type ReactElement } from "react";

import styles from "../SVGRule.module.css";

type Props = {
	onSelectorToggle: (e: React.ChangeEvent<HTMLInputElement>, s: string) => void;
	selector: string;
	isChecked: boolean;
};

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export default function Selector(props: Props): ReactElement {
	const { onSelectorToggle, selector, isChecked } = props;
	return (
		<li className={styles.rule}>
			<label>
				{selector}
				<input
					type="checkbox"
					onChange={(e) => onSelectorToggle(e, selector)}
					checked={isChecked}
				/>
			</label>
		</li>
	);
}
