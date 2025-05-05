import React from "react";


import Group from "@/components/shared/Group.js";
import { getCSSRules } from "@/helpers/getCSSRules.js";
import { getSVGElement } from "@/helpers/getSVGElement.js";
import type { PaneSubComponent } from "@/types.js";

import SVGClass from "./SVGRule.js";

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export const RulesList: PaneSubComponent = (props) => {
	const svg = getSVGElement(props);
	const rules = getCSSRules(svg);
	return (
		<Group>
			<h3>Rules:</h3>
			<ul className={"m-0 p-0"}>
				{rules.map((c) => (
					<SVGClass key={JSON.stringify(c)} {...c} />
				))}
			</ul>
		</Group>
	);
};
