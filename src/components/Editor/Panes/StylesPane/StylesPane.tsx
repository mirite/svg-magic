import ClassList from "./ClassList/ClassList.js";
import { RulesList } from "./RulesList/RulesList.js";

import { Pane } from "@/components/shared/Pane.js";
import type { PaneComponent } from "@/types.js";

/**
 * The pane for displaying CSS rules and declarations.
 *
 * @param props The pane props
 * @returns The component.
 */
const StylesPane: PaneComponent = (props) => {
	return (
		<Pane title={"Styles"}>
			<ClassList stateTuple={props.stateTuple} />
			<RulesList stateTuple={props.stateTuple} />
		</Pane>
	);
};

export default StylesPane;
