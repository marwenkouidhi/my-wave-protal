import React, { useCallback, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function Realistic({ state }) {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  return (
    <ReactCanvasConfetti
      fire={state}
      refConfetti={getInstance}
      style={canvasStyles}
    />
  );
}
