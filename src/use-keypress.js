import { useEffect } from "react";

export function useKeyPress(
  targetKey,
  onPressDown = () => {},
  onPressUp = () => {},
  deps
) {

  return useEffect(() => {
    let prevKey = "";

    const downHandler = ({ key }) => {
      if (key === targetKey && key !== prevKey) {
        prevKey = key;
        onPressDown();
      }
    };

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        prevKey = "";
        onPressUp();
      }
    };
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
