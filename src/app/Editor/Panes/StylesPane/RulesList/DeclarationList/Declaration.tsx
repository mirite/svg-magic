import { type ReactElement } from "react";

import type { CSSTypes } from "@/lib/types.js";

import { Checkbox } from "@/app/shared/CheckBox.js";

type Props = {
	dec: CSSTypes.Declaration;
	onDeclarationToggle: (
		previouslyOn: boolean,
		dec: CSSTypes.Declaration,
	) => void;
	toggledOff: CSSTypes.Declaration[];
};

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export default function Declaration(props: Props): ReactElement {
	const { dec, onDeclarationToggle, toggledOff } = props;
	const isOn = !toggledOff.find((d) => d === dec);
	return (
		<li>
			<Checkbox
				checked={isOn}
				label={`${dec.property} : ${dec.value}`}
				onChange={() => onDeclarationToggle(isOn, dec)}
			/>
		</li>
	);
}
