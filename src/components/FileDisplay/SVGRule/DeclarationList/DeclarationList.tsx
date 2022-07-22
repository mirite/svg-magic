import React, {useRef, useState} from 'react';
import styles from "../SVGRule.module.css";
import CSSParser, {Declaration, Rule} from "css";
import {setTagContent} from "../../../../helpers/dom";

interface IProps {
	rule: Rule;
}

function DeclarationList(props: IProps) {

	const handleDeclarationToggle = (e: React.ChangeEvent<HTMLInputElement>, dec: Declaration) => {
		const oldDeclarations = [...toggledOff];
		let newDeclarations;
		if (e.currentTarget.checked) {
			newDeclarations = oldDeclarations.filter(d => d !== dec);
		} else {
			newDeclarations = [...oldDeclarations, dec];
		}
		setToggledOff(newDeclarations);
		buildStylesheet();
	};

	const buildStylesheet = () => {
		setTagContent(ref, "");

		const newRule = {...props.rule};
		toggledOff.forEach(d => {
			const newDeclaration = {...d};
			newDeclaration.value = "unset !important";
			newRule.declarations?.push(newDeclaration)
		});
		const styleSheet: CSSParser.Stylesheet = {stylesheet: {rules: [newRule]}};
		setTagContent(ref, CSSParser.stringify(styleSheet));
	}

	const declaration = (dec: Declaration, i: number) => {
		return (
			<li key={i} className={styles.rule}>
				<label><input type="checkbox" onChange={(e) => handleDeclarationToggle(e, dec)}
							  checked={!toggledOff.find(d => d === dec)}/>{dec.property} : {dec.value}</label>
			</li>
		);
	};

	const [toggledOff, setToggledOff] = useState<Declaration[]>([]);
	const ref = useRef(null);
	const declarations = props.rule?.declarations || [];
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
