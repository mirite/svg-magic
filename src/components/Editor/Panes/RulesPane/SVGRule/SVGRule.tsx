import { assertIsRule } from "helpers/css";
import type { ReactElement } from "react";
import type { ISVGRule } from "types";

import DeclarationList from "./DeclarationList/DeclarationList";
import SelectorList from "./SelectorList/SelectorList";

type Props = ISVGRule;

/**
 * A CSS rule for the SVG
 *
 * @param props The rule to display
 * @returns The component.
 */
function SVGRule(props: Props): ReactElement {
	const { rule } = props;
	if (!assertIsRule(rule)) return <span>Provided Value Was Not a Rule</span>;
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
