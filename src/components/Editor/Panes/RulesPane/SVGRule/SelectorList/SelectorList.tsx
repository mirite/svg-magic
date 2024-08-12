import type { Rule } from "css";
import CSSParser from "css";
import { setTagContent } from "helpers/dom";
import React, { useRef, useState } from "react";

import styles from "../SVGRule.module.css";

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
		};
		setTagContent(ref, CSSParser.stringify(styleSheet));
		setCurrent(s);
	};

	const selector = (s: string, i: number) => {
		return (
			<li key={i} className={styles.rule}>
				<label>
					{s}
					<input
						type="checkbox"
						onChange={(e) => handleSelectorToggle(e, s)}
						checked={current === s}
					/>
				</label>
			</li>
		);
	};

	const [current, setCurrent] = useState<string>("");
	const ref = useRef(null);
	return (
		<div>
			<ul>{props.selectors.map(selector)}</ul>
			<style ref={ref}></style>
		</div>
	);
}

export default SelectorList;
