import React from 'react';
import SelectorList from './SelectorList/SelectorList';
import DeclarationList from './DeclarationList/DeclarationList';
import { assertIsRule } from 'helpers/css';
import { ISVGRule } from 'types';

interface IProps extends ISVGRule {}

function SVGRule(props: IProps) {
	const { rule } = props;
	if (rule.type !== 'rule') return '';
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
