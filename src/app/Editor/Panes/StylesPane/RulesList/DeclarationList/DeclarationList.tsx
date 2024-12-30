import { type ReactElement, useState } from "react";

import Declaration from "./Declaration.js";

import { stylesheetToString } from "@/lib/css.js";
import type { CSSTypes } from "@/lib/types.js";

interface IProps {
	rule: CSSTypes.Rule;
}

/**
 * A list of the CSS declarations affecting the SVG
 *
 * @param props The rule the declaration resides in.
 * @returns The component.
 */
function DeclarationList(props: IProps): ReactElement {
	const [toggledOff, setToggledOff] = useState<CSSTypes.Declaration[]>([]);
	const handleDeclarationToggle = (
		previouslyOn: boolean,
		dec: CSSTypes.Declaration,
	) => {
		const oldDeclarations = [...toggledOff];
		const newDeclarations = previouslyOn
			? [...oldDeclarations, dec]
			: oldDeclarations.filter((d) => d !== dec);
		setToggledOff(newDeclarations);
	};

	const newRule = { ...props.rule };
	newRule.declarations = [];
	toggledOff.forEach((d) => {
		const newDeclaration = { ...d };
		newDeclaration.value = "unset !important";
		newRule.declarations?.push(newDeclaration);
	});
	const styleSheet: CSSTypes.Stylesheet = {
		stylesheet: { rules: [newRule] },
		type: "stylesheet",
	};
	const tagContent = stylesheetToString(styleSheet);

	const declarations =
		(props.rule?.declarations as CSSTypes.Declaration[]) || [];
	return (
		<div>
			<ul>
				{declarations.map((declaration) => (
					<Declaration
						key={declaration.property}
						onDeclarationToggle={handleDeclarationToggle}
						dec={declaration}
						toggledOff={toggledOff}
					/>
				))}
			</ul>
			<style dangerouslySetInnerHTML={{ __html: tagContent }} />
		</div>
	);
}

export default DeclarationList;
