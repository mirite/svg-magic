import React from 'react';
import PreviewPane from './PreviewPane/PreviewPane';
import EditorPane from './EditorPane/EditorPane';
import ElementsPane from './ElementsPane/ElementsPane';
import RulesPane from './RulesPane/RulesPane';
import { IEditorState } from '../Editor';
import { ChangeOperation } from 'types';
import styles from './Panes.module.css';

interface IProps extends IEditorState {
	workingSVG: string;
	svgContainer: React.RefObject<HTMLDivElement | null>;
	shadowContainer: React.RefObject<HTMLDivElement | null>;
	setWorkingSVG: (newValue: string) => void;
	handleChange: (change: ChangeOperation) => void;
}

function Panes(props: IProps) {
	const {
		paths,
		rules,
		classes,
		points,
		workingSVG,
		svgContainer,
		shadowContainer,
		setWorkingSVG,
		handleChange,
	} = props;
	const svgElem = svgContainer.current?.querySelector('svg');

	return (
		<div className={styles.container}>
			<EditorPane
				svgHTML={workingSVG}
				onChange={(e) => handleChange(e)}
				onManualEdit={(e) => setWorkingSVG(e)}
			/>
			<ElementsPane
				paths={paths}
				onChange={(e) => handleChange(e)}
				svgRoot={svgElem}
				classes={classes}
			/>
			<RulesPane
				rules={rules}
				onChange={(e) => handleChange(e)}
				classes={classes}
			/>
			<PreviewPane
				containerRef={svgContainer}
				svgHTML={workingSVG}
				points={points}
				onChange={(e) => handleChange(e)}
			/>
		</div>
	);
}

export default Panes;
