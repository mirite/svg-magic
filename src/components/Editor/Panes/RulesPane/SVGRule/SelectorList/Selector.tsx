import React, { type ReactElement } from "react";
import { Checkbox } from "@/components/shared/CheckBox.js";

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
		<li>
			<Checkbox
				label={selector}
				checked={isChecked}
				onChange={(e) => onSelectorToggle(e, selector)}
			/>
		</li>
	);
}
