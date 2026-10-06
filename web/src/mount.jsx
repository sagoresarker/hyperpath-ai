import React from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./styles.css";

export function mount(Page) {
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <Page />
        </MotionConfig>
      </LazyMotion>
    </React.StrictMode>
  );
}
