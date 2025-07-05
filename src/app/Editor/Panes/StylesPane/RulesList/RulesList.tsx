import React from "react";

import type { PaneSubComponent } from "@/lib/types.js";

import Group from "@/app/shared/Group.js";
import { getCSSRules } from "@/lib/getCSSRules.js";
import { getSVGElement } from "@/lib/getSVGElement.js";

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
