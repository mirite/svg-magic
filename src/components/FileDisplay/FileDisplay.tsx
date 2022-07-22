import React, {Component, createRef} from 'react';
import SVGClass from './SVGRule/SVGRule';
import PathList from './PathList/PathList';
import {findSVGChildren, findSVGClasses} from 'helpers/parsers';
import styles from './FileDisplay.module.css';
import {IPath, ISVGRule} from 'types';

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

	componentDidMount() {
		this.evaluateSVG();
	}

	componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>) {
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
		return (
			<div className={styles.container}>
				<div
					ref={this.svgContainer}
					dangerouslySetInnerHTML={{__html: workingSVG}}
				></div>
				<textarea value={workingSVG} onChange={(e) => this.updateSVG(e)}></textarea>
				<div>
					<h2>Elements</h2>
					<PathList items={paths}/>
				</div>
				<div>
					<h2>Classes</h2>
					<ul>
						{classes.map((c, i) => (
							<SVGClass key={i} {...c} />
						))}
					</ul>
				</div>
			</div>
		);
	}

	private updateSVG(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const workingSVG = e.currentTarget.value;
		this.setState({workingSVG});
	}
}

export default FileDisplay;
