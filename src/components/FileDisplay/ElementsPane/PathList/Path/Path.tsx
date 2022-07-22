import React from 'react';
import PathList from '../PathList';
import styles from './Path.module.css';
import {ChangeOptions, IPath} from 'types';
import {useDrag} from 'react-dnd';

interface IProps extends IPath {
	onChange: (options: ChangeOptions) => void;
}

function Path(props: IProps) {
	const {elem, name, children} = props;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		elem.classList.toggle('active', e.currentTarget.checked);
	};

	const [{opacity}, dragRef] = useDrag(
		() => ({
			type: 'element',
			item: {elem},
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
		}),
		[]
	);

	return (
		<li ref={dragRef} style={{opacity}}>
			<label className={styles.label}>
				<input type="checkbox" onChange={(e) => handleChange(e)}/>
				{name}
			</label>
			{children.length ? <PathList node={props} onChange={(e) => props.onChange(e)}/> : ''}
		</li>
	);
}

export default Path;
