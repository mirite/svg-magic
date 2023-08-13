import React from "react";
import { SVGSubElement } from "../types";

export function setTagContent(
  ref: React.MutableRefObject<HTMLElement | null>,
  content: string,
) {
  if (ref?.current) {
    ref.current.innerHTML = content;
  }
}

export function isEquivalentElement(
  a: HTMLElement | SVGElement,
  b: HTMLElement | SVGElement,
): boolean {
  const clean = (toClean: HTMLElement | SVGElement) => {
    return toClean.outerHTML.trim().replace(/ active"/g, '"');
  };
  return clean(a) === clean(b);
}

export function findShadowEquivalent(
  realElementToFind: SVGSubElement,
  shadowElement: SVGSubElement,
): SVGSubElement | null {
  if (isEquivalentElement(realElementToFind, shadowElement)) {
    return shadowElement;
  }
  const children = Array.from(shadowElement.children) as SVGSubElement[];

  for (const child of children) {
    const match = findShadowEquivalent(realElementToFind, child);
    if (match) {
      return match;
    }
  }

  return null;
}

export function traverseTree(elem: Element, func: (e: Element) => unknown) {
  func(elem);
  for (const child of elem.children) {
    traverseTree(child, func);
  }
}

export function traverseTreeInsideOut(
  elem: Element,
  func: (e: Element) => unknown,
) {
  for (const child of elem.children) {
    traverseTreeInsideOut(child, func);
  }
  func(elem);
}
