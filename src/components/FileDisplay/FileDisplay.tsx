import React, {Component, createRef} from 'react';
import styles from "./FileDisplay.module.css";
import {IPath, ISVGRule} from "../../types";
import Path from "./Path/Path";

import SVGClass from "./SVGClass/SVGRule";
import {findSVGChildren, findSVGClasses} from "../../helpers/parsers";

interface IProps {
	contents: string;
}

interface IState {
	paths: IPath[];
	classes: ISVGRule[];
}

class FileDisplay extends Component<IProps, IState> {

	public constructor(props: IProps) {
		super(props);
		const paths: IPath[] = [];
		const classes: ISVGRule[] = [];
		this.state = {paths, classes};
	}

	private svgContainer = createRef<HTMLDivElement>()

	componentDidMount() {
		this.evaluateSVG();
	}

	componentDidUpdate(prevProps: Readonly<IProps>) {
		if (this.props === prevProps) return;
		this.evaluateSVG();
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
		const {contents} = this.props;
		const {paths, classes} = this.state;
		return (
			<div className={styles.container}>
				<div ref={this.svgContainer} dangerouslySetInnerHTML={{__html: contents}}>
				</div>
				<textarea>{contents}</textarea>
				<div>
					<h2>Elements</h2>
					<ul>{paths.map((path, i) => <Path key={i} {...path}/>)}</ul>
				</div>
				<div>
					<h2>Classes</h2>
					<ul>{classes.map((c, i) => <SVGClass key={i} {...c}/>)}</ul>
				</div>
			</div>
		);
	}
}

export default FileDisplay;
