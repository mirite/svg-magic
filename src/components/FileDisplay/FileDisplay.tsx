import React, {Component, createRef} from 'react';
import styles from "./FileDisplay.module.css";
import {IPath, ISVGRule, SVGSubElement} from "../../types";
import Path from "./Path/Path";
import CSSParser from "css";
import SVGClass from "./SVGClass/SVGRule";

interface IProps {
	contents: string;
}

interface IState {
	paths: IPath[];
	classes: ISVGRule[];
}

function findSVGChildren(parent: SVGElement | SVGSubElement, paths?: IPath[]) {
	let localPaths = paths ?? [];
	const children = Array.from(parent.children) as SVGSubElement[];
	children.forEach((child, i) => {
		localPaths.push({elem: child, name: `${child.nodeName} ${i}`});
		if (child.children.length) {
			findSVGChildren(child, localPaths);
		}
	});
	return localPaths;
}

function findSVGClasses(parent: SVGElement | SVGSubElement, classes?: ISVGRule[]) {
	let localClasses = classes ?? [];
	const children = Array.from(parent.children) as SVGSubElement[];
	children.forEach((child, i) => {
		if ("defs" !== child.nodeName) return;
		const name = `Rule ${i}`;
		try {
			const styleElem = child.querySelector("style") as HTMLElement;
			if (styleElem && "style" === styleElem.nodeName) {
				const stylesheet = CSSParser.parse(styleElem.innerHTML);
				for (const rule of stylesheet.stylesheet?.rules || []) {
					localClasses.push({name, rule});
				}
			} else {
				console.log(styleElem.nodeName, styleElem);
			}
		} catch (e) {
			console.log(e, child.innerHTML)
		}
		if (child.children.length) {
			findSVGClasses(child, localClasses);
		}
	});
	return localClasses;
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
		if (!this.svgContainer.current) return;
		const svgElem = this.svgContainer.current.firstChild as SVGElement;
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
				<code>{contents}</code>
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
