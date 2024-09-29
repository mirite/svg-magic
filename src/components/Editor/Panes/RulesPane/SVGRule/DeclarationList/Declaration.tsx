import React, { type ReactElement } from "react";
import type { CSSTypes } from "types";

type Props = {
	onDeclarationToggle: (
		previouslyOn: boolean,
		dec: CSSTypes.Declaration,
	) => void;
	dec: CSSTypes.Declaration;
	toggledOff: CSSTypes.Declaration[];
};

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export default function Declaration(props: Props): ReactElement {
	const { onDeclarationToggle, dec, toggledOff } = props;
	const isOn = !toggledOff.find((d) => d === dec);
	return (
		<li>
			<label>
				<input
					type="checkbox"
					onChange={() => onDeclarationToggle(isOn, dec)}
					checked={isOn}
				/>
				{dec.property} : {dec.value}
			</label>
		</li>
	);
}
