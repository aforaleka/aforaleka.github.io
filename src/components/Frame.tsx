import React, { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { useFramesLayer } from "./FramesLayer";

type ElementProps = {
  w?: number;
  h?: number;
  tagName: string;
  children: React.ReactNode;
  className?: string;
  resizable?: boolean;
};

const isTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const Frame = ({
  w,
  h,
  tagName,
  resizable = true,
  children,
  className,
}: ElementProps) => {
  const dragControls = useDragControls();
  const { containerRef, onDragFrame, onResizeFrame } = useFramesLayer();
  const frameRef = useRef<HTMLDivElement>(null);
  const resizableFrameRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={frameRef}
      drag
      dragControls={dragControls}
      dragConstraints={containerRef ?? undefined}
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.05 }}
      onDragStart={() => onDragFrame(frameRef)}
      className="absolute cursor-grab pointer-events-auto"
    >
      <div className="text-white w-fit px-4 py-2 bg-fadedLight backdrop-blur-sm font-mono text-xxs uppercase">
        {tagName}
      </div>

      <div
        className={twMerge(
          "flex-center backdrop-blur-sm bg-fadedLight mx-4",
          className
        )}
        style={{ width: `${w}px`, height: `${h}px` }}
        ref={resizable ? resizableFrameRef : undefined}
      >
        {children}
      </div>
      {resizable && !isTouchScreen && (
        <button
          className="cursor-nwse-resize float-right p-4 mt-[-1.5rem] mr-[-0.5rem]"
          onPointerDownCapture={(e) => e.stopPropagation()}
          onMouseDown={(e) => onResizeFrame(e, resizableFrameRef)}
        >
          ⟓
        </button>
      )}
    </motion.div>
  );
};

export default Frame;
