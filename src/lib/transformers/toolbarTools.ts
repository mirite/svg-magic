import { inlineStyles } from "./inlineStyles.js";
import { prefixClasses } from "./prefixClasses.js";
import { stripClasses } from "./stripClasses.js";
import { stripData } from "./stripData.js";
import { stripIDs } from "./stripID.js";

export const tools = [
	{
		name: "Inline Styles",
		action: inlineStyles,
	},
	{
		name: "Prefix Classes",
		action: prefixClasses,
	},
	{
		name: "Strip IDs",
		action: stripIDs,
	},
	{
		name: "Strip Classes",
		action: stripClasses,
	},
	{
		name: "Strip Data",
		action: stripData,
	},
];
