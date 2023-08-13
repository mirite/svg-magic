import React, { ChangeEvent } from "react";
import PathList from "../PathList";
import styles from "./Path.module.css";
import { ChangeOperation, IMoveOptions, IPath, SVGSubElement } from "types";
import { useDrag, useDrop } from "react-dnd";
import { moveElement } from "helpers/transformers";

interface IProps extends IPath {
  onChange: (options: ChangeOperation) => void;
  onCheck: (e: ChangeEvent<HTMLInputElement>, p: IPath) => void;
  selected: IPath[];
}

function Path(props: IProps) {
  const { elem, name, children, selected } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    elem.classList.toggle("active", e.currentTarget.checked);
    props.onCheck(e, { elem, name, children });
  };

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "element",
      item: { elem },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: "element",
      drop(_item: { elem: SVGSubElement }) {
        const { elem: elementBeingDropped } = _item;
        const currentElement = elem;

        if (elementBeingDropped === currentElement) return;

        const options: IMoveOptions = {
          element: elementBeingDropped,
          target: currentElement,
        };
        props.onChange((e) => moveElement(elem, options));
      },
    }),
    [props.elem],
  );

  return (
    <li style={{ opacity }}>
      <div ref={dropRef}>
        <label ref={dragRef} className={styles.label}>
          <input
            type="checkbox"
            onChange={(e) => handleChange(e)}
            checked={!!selected.find((s) => s.elem === elem)}
          />
          {name}
        </label>
      </div>
      {children.length ? (
        <PathList
          node={props}
          onChange={(e) => props.onChange(e)}
          onCheck={(e, p: IPath) => props.onCheck(e, p)}
          selected={props.selected}
        />
      ) : (
        ""
      )}
    </li>
  );
}

export default Path;
