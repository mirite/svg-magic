import type { ReactElement } from "react";

import DeclarationList from "./DeclarationList/DeclarationList.js";
import SelectorList from "./SelectorList/SelectorList.js";

import Group from "@/components/shared/Group.js";
import { isRule } from "@/helpers/css.js";
import type { ISVGRule } from "@/types.js";

type Props = ISVGRule;

/**
 * A CSS rule for the SVG
 *
 * @param props The rule to display
 * @returns The component.
 */
function SVGRule(props: Props): ReactElement {
	const { rule } = props;
	if (!isRule(rule)) return <span>Provided Value Was Not a Rule</span>;
	return (
		<li>
			<Group>
				<h3>Selectors:</h3>
				<SelectorList selectors={rule.selectors || []} />
				<h3>Declarations:</h3>
				<DeclarationList rule={rule} />
			</Group>
		</li>
	);
}

export default SVGRule;
