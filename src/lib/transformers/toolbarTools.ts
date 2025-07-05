import { inlineStyles } from "./inlineStyles.js";
import { prefixClasses } from "./prefixClasses.js";
import { stripClasses } from "./stripClasses.js";
import { stripData } from "./stripData.js";
import { stripIDs } from "./stripID.js";

export const tools = [
	{
		action: inlineStyles,
		name: "Inline Styles",
	},
	{
		action: prefixClasses,
		name: "Prefix Classes",
	},
	{
		action: stripIDs,
		name: "Strip IDs",
	},
	{
		action: stripClasses,
		name: "Strip Classes",
	},
	{
		action: stripData,
		name: "Strip Data",
	},
];
