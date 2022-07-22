import React from 'react';
import { ISVGRule } from '../../../types';
import SelectorList from './SelectorList/SelectorList';
import DeclarationList from './DeclarationList/DeclarationList';
import { assertIsRule } from '../../../helpers/css';

interface IProps extends ISVGRule {}

function SVGRule(props: IProps) {
	const { rule } = props;
	if (rule.type !== 'rule') return '';
	assertIsRule(rule); //There has to be a better way of doing this.
	return (
		<li>
			<div
				style={{
					border: '1px solid black',
					margin: '1rem',
					padding: '1rem',
				}}
			>
				<h3>Selectors:</h3>
				<SelectorList selectors={rule.selectors || []} />
				<h3>Declarations:</h3>
				<DeclarationList rule={rule} />
			</div>
		</li>
	);
}

export default SVGRule;
