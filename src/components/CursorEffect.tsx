// CursorEffect | This component is used to create a custom cursor effect on the website
// Importing the necessary hooks and functions the React Library, and the useTheme hook
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

// CursorEffect component
function CursorEffect({ isModalOpen }: { isModalOpen: boolean }) {
  const { theme } = useTheme();
  const cursorDotOutline = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorVisible = useRef(false);
  const cursorEnlarged = useRef(false);
  const isMouseDown = useRef(false);

  // Temporary position for the outline, to create the trailing effect
  const [outlinePosition, setOutlinePosition] = useState({ x: 0, y: 0 });

  // Function to handle the mouse movement
  const onMouseMove = (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event;
    setMousePosition({ x, y });

    if (cursorDot.current) {
      // If the mouse is pressed, apply the smaller scale
      const dotScale = isMouseDown.current ? 0.2 : 1;
      cursorDot.current.style.transform = `scale(${dotScale})`;
      cursorDot.current.style.top = `${y - 5}px`; // Adjust position
      cursorDot.current.style.left = `${x - 5}px`; // Adjust position
    }

    if (cursorDotOutline.current) {
      const scale = cursorEnlarged.current ? 2.5 : 1;
      const targetScale = isMouseDown.current ? scale * 0.8 : scale;

      // Update the outline's position with a slight delay
      setOutlinePosition({ x, y });

      // Apply the scaling for the outline
      cursorDotOutline.current.style.transform = `scale(${targetScale})`;
      cursorDotOutline.current.style.top = `${y - 20}px`; // Adjust position
      cursorDotOutline.current.style.left = `${x - 20}px`; // Adjust position
    }
  };

  // Function to handle if the mouse enters the window
  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  // Function to handle if the mouse leaves the window
  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  // Function to handle if the mouse is pressed down
  const onMouseDown = () => {
    isMouseDown.current = true;
    console.log("Mouse Down");

    // Apply smaller scale immediately on mouse down
    if (cursorDot.current) {
      cursorDot.current.style.transform = "scale(0.5)";
    }

    if (cursorDotOutline.current) {
      const scale = cursorEnlarged.current ? 2.5 : 1;
      const targetScale = scale * 0.8;
      cursorDotOutline.current.style.transform = `scale(${targetScale})`;
    }
  };

  // Function to handle if the mouse is released
  const onMouseUp = () => {
    isMouseDown.current = false;
    console.log("Mouse Up");

    // Reset scale when the mouse is released
    if (cursorDot.current) {
      cursorDot.current.style.transform = "scale(1)";
    }

    if (cursorDotOutline.current) {
      const scale = cursorEnlarged.current ? 2.5 : 1;
      cursorDotOutline.current.style.transform = `scale(${scale})`;
    }
  };

  // Function to handle the cursor visibility
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    handleHoverableElements();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
    // Since the onMouseEnter and onMouseLeave functions are defined within the component and do not change, we can safely ignore this warning:
    // 108:6  warning  React Hook useEffect has missing dependencies: 'onMouseEnter' and 'onMouseLeave'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle the cursors functionality inside the modal window
  useEffect(() => {
    if (isModalOpen) {
      handleHoverableElements();
    }
  }, [isModalOpen]);

  // Function to toggle the cursor visibility
  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      cursorDotOutline.current!.style.opacity = "1";
      cursorDot.current!.style.opacity = "1";
    } else {
      cursorDotOutline.current!.style.opacity = "0";
      cursorDot.current!.style.opacity = "0";
    }
  }

  // Function to handle the cursor when moving over hoverable elements
  function handleHoverableElements() {
    document.querySelectorAll("a, button, .project, .dots").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorEnlarged.current = true;
      });
      el.addEventListener("mouseleave", () => {
        cursorEnlarged.current = false;
      });
    });
  }

  return (
    <>
      <div
        ref={cursorDotOutline}
        id="cursor-dot-outline"
        style={{
          position: "fixed",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
          pointerEvents: "none",
          zIndex: 9999,
          top: `${outlinePosition.y - 20}px`, // Follow the position with a delay
          left: `${outlinePosition.x - 20}px`, // Follow the position with a delay
          willChange: "transform",
          transition: "transform 0.15s ease-out, top 0.1s ease-out, left 0.1s ease-out",
        }}
      />
      <div
        ref={cursorDot}
        id="cursor-dot"
        style={{
          position: "fixed",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: theme === 'dark' ? "white" : "#1F2937", // text-gray-800
          pointerEvents: "none",
          zIndex: 10000,
          top: `${mousePosition.y - 5}px`,
          left: `${mousePosition.x - 5}px`,
          willChange: "transform",
          transition: "transform 0.1s ease-out", 
        }}
      />
    </>
  );
}

export default CursorEffect;