import React from 'react';
import PathList from '../PathList';
import styles from './Path.module.css';
import {ChangeOptions, IPath, SVGSubElement} from 'types';
import {useDrag, useDrop} from 'react-dnd';

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

	const [, dropRef] = useDrop(() => ({
		accept: 'element',
		drop(_item: { elem: SVGSubElement }) {
			const {elem: elementBeingDropped} = _item;
			const currentElement = elem;

			if(elementBeingDropped===currentElement) return;

			const options: ChangeOptions = {
				type: "move",
				options: {
					element: elementBeingDropped,
					target: currentElement
				}
			}
			console.log("Dropped on ", elem)
			props.onChange(options);
		},
	}),[props.elem]);

	return (
		<li style={{opacity}}>
			<div ref={dropRef}>
				<label ref={dragRef} className={styles.label}>
					<input type="checkbox" onChange={(e) => handleChange(e)}/>
					{name}
				</label>
			</div>
			{children.length ? <PathList node={props} onChange={(e) => props.onChange(e)}/> : ''}
		</li>
	);
}

export default Path;
