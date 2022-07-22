import React, {useEffect, useRef, useState} from 'react';
import styles from "../SVGRule.module.css";
import CSSParser, {Declaration, Rule} from "css";
import {setTagContent} from "../../../../helpers/dom";

interface IProps {
	rule: Rule;
}

function DeclarationList(props: IProps) {

	const handleDeclarationToggle = (previouslyOn: boolean, dec: Declaration) => {
		const oldDeclarations = [...toggledOff];
		let newDeclarations;
		if (!previouslyOn) {
			console.log("Toggling rule on");
			newDeclarations = oldDeclarations.filter(d => d !== dec);
		} else {
			console.log("Toggling rule off");
			newDeclarations = [...oldDeclarations, dec];
		}
		setToggledOff(newDeclarations);
	};

	const buildStylesheet = () => {
		setTagContent(ref, "");

		const newRule = {...props.rule};
		newRule.declarations = [];
		toggledOff.forEach(d => {
			const newDeclaration = {...d};
			newDeclaration.value = "unset !important";
			newRule.declarations?.push(newDeclaration)
		});
		const styleSheet: CSSParser.Stylesheet = {stylesheet: {rules: [newRule]}};
		setTagContent(ref, CSSParser.stringify(styleSheet));
	}

	const declaration = (dec: Declaration, i: number) => {
		const isOn = !toggledOff.find(d => d === dec);
		return (
			<li key={i} className={styles.rule}>
				<label><input type="checkbox" onChange={(e) => handleDeclarationToggle(isOn, dec)}
							  checked={isOn}/>{dec.property} : {dec.value}</label>
			</li>
		);
	};

	const [toggledOff, setToggledOff] = useState<Declaration[]>([]);
	const ref = useRef(null);
	const declarations = props.rule?.declarations || [];
	useEffect(buildStylesheet, [toggledOff]);
	return (
		<div>
			<ul>
				{declarations.map(declaration)}
			</ul>
			<style ref={ref}></style>
		</div>
	);
}

export default DeclarationList;
