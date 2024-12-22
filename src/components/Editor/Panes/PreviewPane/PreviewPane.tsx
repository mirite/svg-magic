import { Pane } from "components/shared/Pane";
import type { CSSProperties, ReactElement, RefObject } from "react";
import { useEffect, useState } from "react";
import type { ChangeOperation, IPoint } from "types";

import Overlay from "./Overlay/Overlay";

type Props = {
	containerRef: RefObject<HTMLDivElement | null>;
	svgHTML: string;
	points: IPoint[];
	onChange: (changeOptions: ChangeOperation) => void;
};

/**
 * The rendered previews.
 *
 * @param props The component props.
 * @returns The component.
 */
function PreviewPane(props: Props): ReactElement {
	const { containerRef, svgHTML, points, onChange } = props;
	const [base64, setBase64] = useState("");
	const [isDark, setIsDark] = useState(false);
	const [showOverlay, setShowOverlay] = useState(true);
	const [background, setBackground] = useState("#000");
	useEffect(() => {
		setBase64(window.btoa(svgHTML));
	}, [svgHTML]);

	const { current: ref } = containerRef;

	return (
		<Pane style={{ "--background": background } as CSSProperties}>
			<div>
				<h2>Preview</h2>
				<div className="flex gap-4">
					<label className="flex flex-col items-center">
						Dark:
						<input
							className="m-0"
							type="checkbox"
							checked={isDark}
							onChange={(e) => setIsDark(e.currentTarget.checked)}
						/>
					</label>
					<label className="flex flex-col items-center">
						Show Overlay:
						<input
							className="m-0"
							type="checkbox"
							checked={showOverlay}
							onChange={(e) => setShowOverlay(e.currentTarget.checked)}
						/>
					</label>
					{isDark && (
						<label className="flex items-center flex-col">
							Background:
							<input
								className="m-0"
								type="color"
								value={background}
								onChange={(e) => setBackground(e.currentTarget.value)}
							/>
						</label>
					)}
				</div>
			</div>
			<h3>&lt;svg&gt;</h3>
			<div className={"relative"}>
				<div
					className={
						"bg-[--background] rounded-xl border-2 border-slate-500 border-dashed"
					}
					ref={containerRef as RefObject<HTMLDivElement>}
					dangerouslySetInnerHTML={{ __html: svgHTML }}
				></div>
				{showOverlay && (
					<Overlay
						points={points}
						onChange={(e) => onChange(e)}
						svg={ref?.querySelector("svg")}
					/>
				)}
			</div>
			<h3>&lt;img&gt;</h3>
			<div
				className={
					"bg-[--background] rounded-xl border-2 border-slate-500 border-dashed"
				}
			>
				<img src={"data:image/svg+xml;base64," + base64} alt="preview" />
			</div>
		</Pane>
	);
}

export default PreviewPane;
