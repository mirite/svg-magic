import { type ReactElement, useEffect, useRef, useState } from "react";

import Declaration from "./Declaration.js";

import { stylesheetToString } from "@/helpers/css.js";
import { setTagContent } from "@/helpers/dom.js";
import type { CSSTypes } from "@/types.js";

interface IProps {
	rule: CSSTypes.Rule;
}

/** @param props */
function DeclarationList(props: IProps): ReactElement {
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

	const buildStylesheet = () => {
		setTagContent(ref, "");

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
		setTagContent(ref, stylesheetToString(styleSheet));
	};

	const [toggledOff, setToggledOff] = useState<CSSTypes.Declaration[]>([]);
	const ref = useRef(null);
	const declarations =
		(props.rule?.declarations as CSSTypes.Declaration[]) || [];
	useEffect(buildStylesheet, [toggledOff]);
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
			<style ref={ref}></style>
		</div>
	);
}

export default DeclarationList;
