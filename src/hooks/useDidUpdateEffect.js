import { useRef, useEffect } from "react";

// skip first rendering
function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, inputs);
}

export default useDidUpdateEffect;
