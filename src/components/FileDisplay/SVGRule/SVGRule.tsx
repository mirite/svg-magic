import React, {Component, createRef} from 'react';
import {CSSContents, ISVGRule} from "../../../types";
import CSSParser, {Declaration, Rule} from "css";
import SelectorList from "./SelectorList/SelectorList";
import DeclarationList from "./DeclarationList/DeclarationList";

interface IProps extends ISVGRule {
}

interface IState {
	current: string;
}

function assertsIsRule(value: CSSContents): asserts value is CSSParser.Rule {
	if (value.type != 'rule') throw new Error("Value provided is not a CSS rule");
}

class SVGRule extends Component<IProps, IState> {

	public constructor(props: IProps) {
		super(props);
		this.state = {current: ""};
	}

	render() {
		const {rule} = this.props;
		if (rule.type != 'rule') return "";
		assertsIsRule(rule); //There has to be a better way of doing this.
		return (
			<li>
				<div style={{border: "1px solid black", margin: "1rem", padding: "1rem"}}>
					<h3>Selectors:</h3>
					<SelectorList selectors={rule.selectors || []}/>
					<h3>Declarations:</h3>
					<DeclarationList rule={rule} />
				</div>

			</li>
		);
	}

	private handleMouseEnterDeclaration(r: Rule, d: Declaration) {
		console.log({r});

	}


}

export default SVGRule;
