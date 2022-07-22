import React, {Component} from 'react';
import styles from "./Path.module.css";
import {IPath} from "../../../types";

interface IProps extends IPath {
}

class Path extends Component<IProps> {
	render() {
		return (
			<li className={styles.label} onMouseEnter={(e) => this.handleMouseEnter(e)}
				onMouseLeave={(e) => this.handleMouseLeave(e)}>
				{this.props.name}
			</li>
		);
	}

	private handleMouseEnter(e: React.MouseEvent<HTMLLIElement>) {
		const {elem} = this.props;
		elem.classList.add("active");
	}

	private handleMouseLeave(e: React.MouseEvent<HTMLLIElement>) {
		const {elem} = this.props;
		elem.classList.remove("active");
	}
}

export default Path;
