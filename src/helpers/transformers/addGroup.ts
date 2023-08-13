import { IGroupOptions } from "../../types";
import { findShadowEquivalent } from "../dom";

export function addGroup(shadowContainer: SVGElement, change: IGroupOptions) {
  const { className, selectedItems } = change;
  const newGroup = document.createElement("g");
  newGroup.className = className || "";
  if (selectedItems) {
    for (const path of selectedItems) {
      const elementEquiv = findShadowEquivalent(path.elem, shadowContainer);
      if (elementEquiv) {
        newGroup.append(elementEquiv);
      }
    }
  }
  shadowContainer.append(newGroup);
}
