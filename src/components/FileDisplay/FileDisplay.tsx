import React, {Component, createRef} from 'react';
import {findClasses, findSVGChildren, findSVGPoints, findSVGRules} from 'helpers/parsers';
import styles from './FileDisplay.module.css';
import {ChangeOptions, IPath, IPoint, ISVGRule} from 'types';
import ElementsPane from './ElementsPane/ElementsPane';
import RulesPane from './RulesPane/RulesPane';
import PreviewPane from './PreviewPane/PreviewPane';
import EditorPane from './EditorPane/EditorPane';
import {performChange, stripData, stripIDs} from '../../helpers/transformer';

interface IProps {
	contents: string;
}

interface IState {
	workingSVG: string;
	paths: IPath[];
	rules: ISVGRule[];
	classes: string[];
	points: IPoint[];
}

class FileDisplay extends Component<IProps, IState> {
	public constructor(props: IProps) {
		super(props);
		const paths: IPath[] = [];
		const rules: ISVGRule[] = [];
		const classes: string[] = [];
		const points: IPoint[] = [];
		const workingSVG = props.contents;
		this.state = {paths, rules, classes, workingSVG, points};
	}

	private svgContainer = createRef<HTMLDivElement>();
	private shadowContainer = createRef<HTMLDivElement>();

	componentDidMount() {
		this.evaluateSVG();
	}

	componentDidUpdate(
		prevProps: Readonly<IProps>,
		prevState: Readonly<IState>
	) {
		if (this.props !== prevProps) {
			const workingSVG = this.props.contents;
			this.setState({workingSVG});
		}
		if (this.state.workingSVG !== prevState.workingSVG) {
			this.evaluateSVG();
		}
	}

	private evaluateSVG() {
		const svgContainer = this.svgContainer.current;
		if (!svgContainer) return;
		const svgElem = svgContainer.firstChild as SVGElement;
		if (!svgElem) return;
		const paths: IPath[] = findSVGChildren(svgElem);
		const rules: ISVGRule[] = findSVGRules(svgElem);
		const points: IPoint[] = findSVGPoints(svgElem);
		const classes = findClasses(svgElem);
		this.setState({paths, rules, classes, points});
	}

	render() {
		const {paths, rules, workingSVG, classes, points} = this.state;
		const svgElem = this.svgContainer.current?.querySelector('svg');
		return (
			<div className={styles.fileDisplay}>
				<header className={styles.header}>
					<h1>SVG Magic</h1>
					<div className={styles.actions}>
						<button onClick={()=>this.performChange(stripIDs)}>Strip IDs</button>
						<button onClick={()=>this.performChange(stripData)}>Strip Data</button>
					</div>
				</header>
				<div className={styles.container}>
					<PreviewPane
						containerRef={this.svgContainer}
						svgHTML={workingSVG}
						points={points}
						onChange={(e) => this.performChange(e)}
					/>
					<EditorPane
						svgHTML={workingSVG}
						onChange={(e) => this.updateSVG(e)}
					/>
					<ElementsPane
						paths={paths}
						onChange={(e) => this.performChange(e)}
						svgRoot={svgElem}
					/>
					<RulesPane rules={rules} onChange={(e) => this.performChange(e)} classes={classes}/>
					<div
						style={{display: 'none'}}
						ref={this.shadowContainer}
					></div>
				</div>
			</div>
		);
	}

	private updateSVG(e: string) {
		const workingSVG = e;
		this.setState({workingSVG});
	}

	private performChange(e: ChangeOptions) {
		this.updateSVG(
			performChange(this.shadowContainer, e, this.state.workingSVG)
		);
	}

}

export default FileDisplay;
