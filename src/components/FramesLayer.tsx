import {
  createContext,
  RefObject,
  useContext,
  useRef,
  useState,
  MouseEvent,
} from "react";
import BlobFrame from "./frames/BlobFrame";
import SpotifyFrame from "./frames/SpotifyFrame";
import ZoomedInBlobFrame from "./frames/ZoomedInBlobFrame";
import BioFrame from "./frames/BioFrame";
import LinksFrame from "./frames/LinksFrame";
import JamesTurrellFrame from "./frames/JamesTurrellFrame";

type FramesLayerContextType = {
  containerRef: RefObject<HTMLDivElement> | null;
  onDragFrame: (ref: RefObject<HTMLDivElement>) => void;
  onResizeFrame: (
    event: MouseEvent<HTMLButtonElement>,
    ref: RefObject<HTMLDivElement>
  ) => void;
};

const FramesLayerContext = createContext<FramesLayerContextType>({
  containerRef: null,
  onDragFrame: () => {},
  onResizeFrame: () => {},
});

export const Frames = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState(1);
  const [activeFrameRef, setActiveFrameRef] =
    useState<RefObject<HTMLDivElement> | null>(null);

  const [resizeState, setResizeState] = useState({
    isActive: false,
    startX: 0,
    startY: 0,
  });

  // Handles updating the z-index of a frame when it's dragged
  const onDragFrame = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.style.zIndex = zIndex.toString();
      setZIndex((prevZIndex) => prevZIndex + 1);
    }
  };

  const onResizeFrame = (
    event: MouseEvent<HTMLButtonElement>,
    ref: RefObject<HTMLDivElement>
  ) => {
    setActiveFrameRef(ref);
    setResizeState({
      isActive: true,
      startX: event.clientX,
      startY: event.clientY,
    });
  };

  // Handles resizing of the active frame
  const resizeFrame = (event: MouseEvent<HTMLDivElement>) => {
    const { isActive, startX, startY } = resizeState;

    if (isActive && activeFrameRef?.current) {
      const frame = activeFrameRef.current;
      const currentWidth = parseFloat(frame.style.width ?? "0");
      const currentHeight = parseFloat(frame.style.height ?? "0");

      const widthChange = event.clientX - startX;
      const heightChange = event.clientY - startY;

      frame.style.width = `${currentWidth + widthChange}px`;
      frame.style.height = `${currentHeight + heightChange}px`;

      setResizeState({
        isActive,
        startX: event.clientX,
        startY: event.clientY,
      });
    }
  };

  const stopResize = () => {
    setActiveFrameRef(null);
    setResizeState((prev) => ({ ...prev, isActive: false }));
  };

  return (
    <FramesLayerContext.Provider
      value={{
        containerRef,
        onDragFrame,
        onResizeFrame,
      }}
    >
      <div
        ref={containerRef}
        className="full-screen flex-center"
        onMouseMove={resizeFrame}
        onMouseUp={stopResize}
      >
        <div className="mx-auto px-8">
          <span>Hello hello, I'm</span>
          <h1 className="w-min md:w-fit text-[4rem] tracking-[-2px] leading-[0.7] font-medium scale-y-[1.1] my-4 mx-4">
            Aleka Cheung
          </h1>
        </div>
        <BioFrame />
        <LinksFrame />
        <BlobFrame />
        <ZoomedInBlobFrame />
        <SpotifyFrame />
        <JamesTurrellFrame />
      </div>
    </FramesLayerContext.Provider>
  );
};

export function useFramesLayer(): FramesLayerContextType {
  return useContext(FramesLayerContext);
}
