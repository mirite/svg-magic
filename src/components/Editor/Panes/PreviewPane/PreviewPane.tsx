import type { CSSProperties, ReactElement, RefObject } from "react";
import { useEffect, useState } from "react";

import Overlay from "./Overlay/Overlay.js";

import { Checkbox } from "@/components/shared/CheckBox.js";
import { Input } from "@/components/shared/Input.js";
import { Pane } from "@/components/shared/Pane.js";
import type { ChangeOperation, IPoint } from "@/types.js";

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
		<Pane
			style={{ "--background": isDark ? background : "#FFF" } as CSSProperties}
		>
			<div>
				<h2>Preview</h2>
				<div className="flex gap-4">
					<Checkbox
						checked={isDark}
						onChange={() => setIsDark((e) => !e)}
						label="Dark:"
					/>
					<Checkbox
						checked={showOverlay}
						onChange={() => setShowOverlay((e) => !e)}
						label="Show Overlay:"
					/>
					{isDark && (
						<Input
							type="color"
							value={background}
							onChange={(e) => setBackground(e.currentTarget.value)}
							label={"Background:"}
						/>
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
