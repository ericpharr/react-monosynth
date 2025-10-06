import { useEffect, useRef } from "react";

export function useKeyPress(
  targetKey: string,
  onPressDown = () => {},
  onPressUp = () => {},
  deps: any[]
) {
  const prevKey = useRef("");
  return useEffect(() => {
    function downHandler(e: KeyboardEvent) {
      if (e.key === "'") e.preventDefault();
      if (e.key === targetKey && e.key !== prevKey.current) {
        prevKey.current = e.key;
        onPressDown();
      }
    }

    // If released key is our target key then set to false
    function upHandler(e: KeyboardEvent) {
      if (e.key === "'") e.preventDefault();
      if (e.key === targetKey) {
        prevKey.current = "";
        onPressUp();
      }
    }
    // If pressed key is our target key then set to true

    // Add event listeners
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line
  }, [...deps]);
}
