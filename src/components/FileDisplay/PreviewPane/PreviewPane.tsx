import React, {useEffect, useState} from 'react';
import styles from './PreviewPane.module.css';
import {ChangeOptions, IPoint} from 'types';
import Overlay from "./Overlay/Overlay";

interface IProps {
	containerRef: React.RefObject<HTMLDivElement>;
	svgHTML: string;
	points: IPoint[];
	onChange: (changeOptions: ChangeOptions) => void;
}

function PreviewPane(props: IProps) {
	const {containerRef, svgHTML, points, onChange} = props;
	const [base64, setBase64] = useState('');
	const [isDark, setIsDark] = useState(false);
	const [showOverlay, setShowOverlay] = useState(true);


	useEffect(() => {
		setBase64(window.btoa(svgHTML));
	}, [svgHTML]);

	return (
		<div
			className={
				styles.previewPane + ' ' + (isDark ? styles.dark : styles.light)
			}
		>
			<div className={styles.title}>
				<h2>Preview</h2>
				<div className="spacer"></div>
				<label>
					Dark:
					<input
						type="checkbox"
						checked={isDark}
						onChange={(e) => setIsDark(e.currentTarget.checked)}
					/>
				</label>
				<label>
					Show Overlay:
					<input
						type="checkbox"
						checked={showOverlay}
						onChange={(e) => setShowOverlay(e.currentTarget.checked)}
					/>
				</label>
			</div>
			<h3>&lt;svg&gt;</h3>
			<div className={styles.livePreview}>
				<div
					className={styles.preview}
					ref={containerRef}
					dangerouslySetInnerHTML={{__html: svgHTML}}
				></div>
				{showOverlay ? <Overlay points={points} onChange={(e) => onChange(e)}
						  svg={containerRef.current?.querySelector("svg")}/> : ""}
			</div>
			<h3>&lt;img&gt;</h3>
			<div className={styles.preview}>
				<img
					src={'data:image/svg+xml;base64,' + base64}
					alt="preview"
				/>
			</div>
		</div>
	);
}

export default PreviewPane;
