import React, {useEffect, useRef, useState} from 'react';
import {evaluateSVG,} from 'helpers/parsers';
import styles from './FileDisplay.module.css';
import {ChangeOptions, IPath, IPoint, ISVGRule} from 'types';
import ElementsPane from './ElementsPane/ElementsPane';
import RulesPane from './RulesPane/RulesPane';
import PreviewPane from './PreviewPane/PreviewPane';
import EditorPane from './EditorPane/EditorPane';
import {performChange, stripData, stripIDs} from 'helpers/transformer';

interface IProps {
	contents: string;
	onClose: () => void;
}

export interface IEditorState {
	paths: IPath[];
	rules: ISVGRule[];
	classes: string[];
	points: IPoint[];
}

const defaultState: IEditorState = {
	paths: [],
	rules: [],
	classes: [],
	points: []
}

function FileDisplay(props: IProps) {
	const [state, setState] = useState<IEditorState>(defaultState);
	const [workingSVG, setWorkingSVG] = useState<string>(props.contents);

	const svgContainer = useRef<HTMLDivElement>(null);
	const shadowContainer = useRef<HTMLDivElement>(null);

	const handleChange = (e: ChangeOptions) => {
		setWorkingSVG(performChange(shadowContainer, e, workingSVG));
	};

	useEffect(() => {
			setWorkingSVG(props.contents);
		},
		[props]);

	useEffect(() => {
		if (!svgContainer) return;
		const newState = evaluateSVG(svgContainer.current);
		if (newState) {
			setState(newState)
		}
	}, [workingSVG])


	const {paths, rules, classes, points} = state;
	const svgElem = svgContainer.current?.querySelector('svg');
	return (
		<div className={styles.fileDisplay}>
			<header className={styles.header}>
				<h1>SVG Magic</h1>
				<div className={styles.actions}>
					<button onClick={() => handleChange(stripIDs)}>
						Strip IDs
					</button>
					<button onClick={() => handleChange(stripData)}>
						Strip Data
					</button>
					<button onClick={() => props.onClose()}>Close</button>
				</div>
			</header>
			<div className={styles.container}>
				<PreviewPane
					containerRef={svgContainer}
					svgHTML={workingSVG}
					points={points}
					onChange={(e) => handleChange(e)}
				/>
				<EditorPane
					svgHTML={workingSVG}
					onChange={(e) => setWorkingSVG(e)}
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
				<div
					style={{display: 'none'}}
					ref={shadowContainer}
				></div>
			</div>
		</div>
	);
}


export default FileDisplay;
