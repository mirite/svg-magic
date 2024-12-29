import { type ReactElement } from "react";

import { Checkbox } from "@/app/shared/CheckBox.js";
import type { CSSTypes } from "@/lib/types.js";

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
			<Checkbox
				checked={isOn}
				onChange={() => onDeclarationToggle(isOn, dec)}
				label={`${dec.property} : ${dec.value}`}
			/>
		</li>
	);
}
