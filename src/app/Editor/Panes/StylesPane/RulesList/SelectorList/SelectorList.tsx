import type { Rule } from "css";
import CSSParser from "css";
import React, { type ReactElement, useState } from "react";

import Selector from "./Selector.js";

interface IProps {
	selectors: string[];
}

/**
 * A list of the selectors pertaining to the SVG
 *
 * @param props The selectors in question
 * @returns The component
 */
function SelectorList(props: IProps): ReactElement {
	const handleSelectorToggle = (
		e: React.ChangeEvent<HTMLInputElement>,
		s: string,
	) => {
		if (!e.currentTarget.checked) {
			setCurrent("");
			return;
		}
		setCurrent(s);
	};

	const [current, setCurrent] = useState<string>("");
	let content = "";
	if (current) {
		const newRule: Rule = {
			type: "rule",
			selectors: [current],
			declarations: [
				{
					type: "declaration",
					value: "red !important",
					property: "stroke",
				},
			],
		};
		const styleSheet: CSSParser.Stylesheet = {
			stylesheet: { rules: [newRule] },
			type: "stylesheet",
		};
		content = CSSParser.stringify(styleSheet);
	}
	return (
		<div>
			<ul>
				{props.selectors.map((selector) => (
					<Selector
						key={selector}
						onSelectorToggle={handleSelectorToggle}
						selector={selector}
						isChecked={selector === current}
					/>
				))}
			</ul>
			<style dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}

export default SelectorList;
