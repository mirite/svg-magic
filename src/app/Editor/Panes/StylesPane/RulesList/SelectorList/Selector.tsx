import React, { type ReactElement } from "react";

import { Checkbox } from "@/app/shared/CheckBox.js";

type Props = {
	isChecked: boolean;
	onSelectorToggle: (e: React.ChangeEvent<HTMLInputElement>, s: string) => void;
	selector: string;
};

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export default function Selector(props: Props): ReactElement {
	const { isChecked, onSelectorToggle, selector } = props;
	return (
		<li>
			<Checkbox
				checked={isChecked}
				label={selector}
				onChange={(e) => onSelectorToggle(e, selector)}
			/>
		</li>
	);
}
