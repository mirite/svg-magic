import React, { useEffect, useRef, useState } from "react";
import { CSSTypes } from "types";
import { setTagContent } from "helpers/dom";
import { stylesheetToText } from "helpers/css";

interface IProps {
  rule: CSSTypes.Rule;
}

function DeclarationList(props: IProps) {
  const handleDeclarationToggle = (
    previouslyOn: boolean,
    dec: CSSTypes.Declaration,
  ) => {
    const oldDeclarations = [...toggledOff];
    const newDeclarations = previouslyOn
      ? [...oldDeclarations, dec]
      : oldDeclarations.filter((d) => d !== dec);
    setToggledOff(newDeclarations);
  };

  const buildStylesheet = () => {
    setTagContent(ref, "");

    const newRule = { ...props.rule };
    newRule.declarations = [];
    toggledOff.forEach((d) => {
      const newDeclaration = { ...d };
      newDeclaration.value = "unset !important";
      newRule.declarations?.push(newDeclaration);
    });
    const styleSheet: CSSTypes.Stylesheet = {
      stylesheet: { rules: [newRule] },
    };
    setTagContent(ref, stylesheetToText(styleSheet));
  };

  const declaration = (dec: CSSTypes.Declaration, i: number) => {
    const isOn = !toggledOff.find((d) => d === dec);
    return (
      <li key={i}>
        <label>
          <input
            type="checkbox"
            onChange={() => handleDeclarationToggle(isOn, dec)}
            checked={isOn}
          />
          {dec.property} : {dec.value}
        </label>
      </li>
    );
  };

  const [toggledOff, setToggledOff] = useState<CSSTypes.Declaration[]>([]);
  const ref = useRef(null);
  const declarations = props.rule?.declarations || [];
  useEffect(buildStylesheet, [toggledOff]);
  return (
    <div>
      <ul>{declarations.map(declaration)}</ul>
      <style ref={ref}></style>
    </div>
  );
}

export default DeclarationList;
