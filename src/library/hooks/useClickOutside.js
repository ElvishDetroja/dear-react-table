import { useEffect, useRef } from "react";

function useClickOutside(handler) {
  //
  let domNode = useRef();

  useEffect(() => {
    function action(event) {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("click", action);

    return () => {
      document.removeEventListener("click", action);
    };
  });

  return domNode;
}

export default useClickOutside;

//
//
//
//

// let domNode = useClickOutside(() => {
//     setDropdownSignal(false);
//   });
