import type { Rule } from "css";
import CSSParser from "css";
import { setTagContent } from "helpers/dom";
import React, { useRef, useState } from "react";

import Selector from "./Selector";

interface IProps {
	selectors: string[];
}

/** @param props */
function SelectorList(props: IProps) {
	const handleSelectorToggle = (
		e: React.ChangeEvent<HTMLInputElement>,
		s: string,
	) => {
		if (!e.currentTarget.checked) {
			setCurrent("");
			setTagContent(ref, "");
			return;
		}
		const newRule: Rule = {
			type: "rule",
			selectors: [s],
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
		setTagContent(ref, CSSParser.stringify(styleSheet));
		setCurrent(s);
	};

	const [current, setCurrent] = useState<string>("");
	const ref = useRef(null);
	return (
		<div>
			<ul>
				{props.selectors.map((selector, index) => (
					<Selector
						key={index}
						onSelectorToggle={handleSelectorToggle}
						selector={selector}
						isChecked={selector === current}
					/>
				))}
			</ul>
			<style ref={ref}></style>
		</div>
	);
}

export default SelectorList;
