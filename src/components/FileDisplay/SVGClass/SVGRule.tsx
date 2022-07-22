import React, {Component, createRef} from 'react';
import {CSSContents, ISVGRule} from "../../../types";
import CSSParser, {Declaration, Rule} from "css";
import styles from "./SVGRule.module.css";

interface IProps extends ISVGRule {
}

function assertsIsRule(value: CSSContents): asserts value is CSSParser.Rule {
	if (value.type != 'rule') throw new Error("Value provided is not a CSS rule");
}

class SVGRule extends Component<IProps> {
	private styleTag = createRef<HTMLStyleElement>();

	render() {
		const {rule} = this.props;
		if (rule.type != 'rule') return "";
		assertsIsRule(rule); //There has to be a better way of doing this.
		return (
			<li>
				<div style={{border: "1px solid black", margin: "1rem", padding: "1rem"}}>
					<h3>Selectors:</h3>
					<ul>
						{rule.selectors?.map((s, i) => <li key={i} className={styles.rule}
														   onMouseEnter={() => this.handleMouseEnterSelector(s)}>{s}</li>)}
					</ul>
					<h3>Declarations:</h3>
					<ul>
						{rule.declarations?.map((d, i) => <li key={i} className={styles.rule}
															  onMouseEnter={() => this.handleMouseEnterDeclaration(rule, d)}
															  onMouseLeave={() => this.handleMouseLeave()}>{"property" in d ? d.property : "Comment"} : {"value" in d ? d.value : ""}</li>)}
					</ul>
				</div>
				<style ref={this.styleTag}></style>
			</li>
		);
	}

	private handleMouseEnterDeclaration(r: Rule, d: Declaration) {
		console.log({r});
		const newRule = {...r};
		const newDeclaration = {...d};
		newDeclaration.value = "unset !important";
		newRule.declarations = [];
		newRule.declarations?.push(newDeclaration)
		const styleSheet: CSSParser.Stylesheet = {stylesheet: {rules: [newRule]}};
		this.setStyleTage(CSSParser.stringify(styleSheet));
	}

	private handleMouseLeave() {
		this.setStyleTage("");
	}

	private setStyleTage(content: string) {
		if (this.styleTag.current) {
			this.styleTag.current.innerHTML = content;
		}
	}

	private handleMouseEnterSelector(s: string) {
		const newRule: Rule = {
			type: "rule",
			selectors: [s],
			declarations: [{type: "declaration", value: "red !important", property: "stroke"}]
		};
		console.log({newRule});
		const styleSheet: CSSParser.Stylesheet = {stylesheet: {rules: [newRule]}};
		this.setStyleTage(CSSParser.stringify(styleSheet));
	}
}

export default SVGRule;
