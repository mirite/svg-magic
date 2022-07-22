import React, {Component, createRef} from 'react';
import {findSVGChildren, findSVGClasses} from 'helpers/parsers';
import styles from './FileDisplay.module.css';
import {ChangeOptions, IPath, ISVGRule} from 'types';
import ElementsPane from './ElementsPane/ElementsPane';
import ClassesPane from './ClassesPane/ClassesPane';
import PreviewPane from './PreviewPane/PreviewPane';
import EditorPane from './EditorPane/EditorPane';
import {performChange} from '../../helpers/transformer';

interface IProps {
	contents: string;
}

interface IState {
	workingSVG: string;
	paths: IPath[];
	classes: ISVGRule[];
}

class FileDisplay extends Component<IProps, IState> {
	public constructor(props: IProps) {
		super(props);
		const paths: IPath[] = [];
		const classes: ISVGRule[] = [];
		const workingSVG = props.contents;
		this.state = {paths, classes, workingSVG};
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
		const classes: ISVGRule[] = findSVGClasses(svgElem);
		this.setState({paths, classes});
	}

	render() {
		const {paths, classes, workingSVG} = this.state;
		const svgElem = this.svgContainer.current?.querySelector("svg");
		return (
			<div className={styles.container}>
				<PreviewPane
					containerRef={this.svgContainer}
					svgHTML={workingSVG}
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
				<ClassesPane classes={classes}/>
				<div
					style={{display: 'none'}}
					ref={this.shadowContainer}
				></div>
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
