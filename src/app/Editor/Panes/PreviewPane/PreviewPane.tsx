import type { CSSProperties } from "react";

import { useEffect, useState } from "react";

import type { PaneComponent } from "@/lib/types.js";

import { Checkbox } from "@/app/shared/CheckBox.js";
import { Input } from "@/app/shared/Input.js";
import { Pane } from "@/app/shared/Pane.js";

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
					label="Dark:"
					onChange={() => setIsDark((e) => !e)}
				/>
				<Checkbox
					checked={showOverlay}
					label="Show Overlay:"
					onChange={() => setShowOverlay((e) => !e)}
				/>
				{isDark ? (
					<Input
						label={"Background:"}
						onChange={(e) => setBackground(e.currentTarget.value)}
						type="color"
						value={background}
					/>
				) : null}
			</div>
			<h3>&lt;svg&gt;</h3>
			<div className={"relative"}>
				<div
					className={
						"rounded-xl border-2 border-dashed border-slate-500 bg-(--background)"
					}
					dangerouslySetInnerHTML={{ __html: svgHTML }}
				/>
				{showOverlay ? <Overlay stateTuple={props.stateTuple} /> : null}
			</div>
			<h3>&lt;img&gt;</h3>
			<div
				className={
					"rounded-xl border-2 border-dashed border-slate-500 bg-(--background)"
				}
			>
				<img alt="preview" src={"data:image/svg+xml;base64," + base64} />
			</div>
		</Pane>
	);
};

export default PreviewPane;
