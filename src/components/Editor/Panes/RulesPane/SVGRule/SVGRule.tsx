import { assertIsRule } from "helpers/css";
import React from "react";
import type { ISVGRule } from "types";

import DeclarationList from "./DeclarationList/DeclarationList";
import SelectorList from "./SelectorList/SelectorList";

interface IProps extends ISVGRule {}

/** @param props */
function SVGRule(props: IProps) {
	const { rule } = props;
	if (rule.type !== "rule") return <span>Provided Value Was Not a Rule</span>;
	assertIsRule(rule); //There has to be a better way of doing this.
	return (
		<li>
			<div className="group">
				<h3>Selectors:</h3>
				<SelectorList selectors={rule.selectors || []} />
				<h3>Declarations:</h3>
				<DeclarationList rule={rule} />
			</div>
		</li>
	);
}

export default SVGRule;
