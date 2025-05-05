import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/app/shared/CheckBox.js";
import { Input } from "@/app/shared/Input.js";
import { Pane } from "@/app/shared/Pane.js";
import type { PaneComponent } from "@/lib/types.js";

import Overlay from "./Overlay.js";

/**
 * The rendered previews.
 *
 * @param props The component props.
 * @returns The component.
 */
const PreviewPane: PaneComponent = (props) => {
	const { file } = props.stateTuple[0];
	const svgHTML = file.contents;
	const [base64, setBase64] = useState("");
	const [isDark, setIsDark] = useState(false);
	const [showOverlay, setShowOverlay] = useState(true);
	const [background, setBackground] = useState("#000");

	useEffect(() => {
		setBase64(window.btoa(svgHTML));
	}, [svgHTML]);

	return (
		<Pane
			style={{ "--background": isDark ? background : "#FFF" } as CSSProperties}
			title={"Preview"}
		>
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
				{isDark ? (
					<Input
						type="color"
						value={background}
						onChange={(e) => setBackground(e.currentTarget.value)}
						label={"Background:"}
					/>
				) : null}
			</div>
			<h3>&lt;svg&gt;</h3>
			<div className={"relative"}>
				<div
					className={
						"bg-(--background) rounded-xl border-2 border-slate-500 border-dashed"
					}
					dangerouslySetInnerHTML={{ __html: svgHTML }}
				/>
				{showOverlay ? <Overlay stateTuple={props.stateTuple} /> : null}
			</div>
			<h3>&lt;img&gt;</h3>
			<div
				className={
					"bg-(--background) rounded-xl border-2 border-slate-500 border-dashed"
				}
			>
				<img src={"data:image/svg+xml;base64," + base64} alt="preview" />
			</div>
		</Pane>
	);
};

export default PreviewPane;
