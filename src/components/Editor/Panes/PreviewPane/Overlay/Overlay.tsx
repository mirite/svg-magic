import React, { useEffect, useRef } from "react";
import { drawOverlay, onMouseDown } from "helpers/overlay";
import { ChangeOperation, IPoint } from "types";

interface IProps {
  points: IPoint[];
  onChange: (changeOptions: ChangeOperation) => void;
  svg: SVGElement | null | undefined;
}

function Overlay(props: IProps) {
  const { points, onChange, svg } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef?.current && svg) {
      drawOverlay(points, canvasRef.current, svg);
    }
  }, [props]);

  if (!svg) {
    return <></>;
  }
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={(e) =>
        onMouseDown(
          e,
          canvasRef.current!,
          points,
          (changeOptions) => onChange(changeOptions),
          svg,
        )
      }
    ></canvas>
  );
}

export default Overlay;
