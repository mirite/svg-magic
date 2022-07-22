import React, { Component } from 'react';
import styles from './Path.module.css';
import { IPath } from '../../../../types';
import PathList from '../PathList';

interface IProps extends IPath {}

class Path extends Component<IProps> {
	render() {
		return (
			<li>
				<label className={styles.label}>
					<input
						type="checkbox"
						onChange={(e) => this.handleChange(e)}
					/>
					{this.props.name}
				</label>
				{this.props.children.length ? (
					<PathList items={this.props.children} />
				) : (
					''
				)}
			</li>
		);
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { elem } = this.props;
		elem.classList.toggle('active', e.currentTarget.checked);
	}
}

export default Path;
