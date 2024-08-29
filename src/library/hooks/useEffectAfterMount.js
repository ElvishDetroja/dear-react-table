import { useEffect, useRef } from "react";

function useEffectAfterMount(func, dependencies = []) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    func();
  }, dependencies);
}

export default useEffectAfterMount;
